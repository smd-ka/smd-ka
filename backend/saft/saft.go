package saft

import (
	"net/http"
	"net/mail"
	"strings"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/mailer"
	"github.com/pocketbase/pocketbase/tools/template"

	"SMD-KA-Backend/gdprConsent"
	"SMD-KA-Backend/saft/regStatus"
)

const (
	// Constants for SAFT registration emails
	Subject   = "[SMD-KA] SAFT Anmeldung "
	OrgaEmail = "inreach@smd-karlsruhe.de"

	// checked against lowercase, without any characters outside [a-z]
	BotQuestionExpected = "abendmahl"
)

func SaftEmails(app *pocketbase.PocketBase) {

	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.GET("/api/saft/registration-status", func(e *core.RequestEvent) error {
			return e.JSON(http.StatusOK, regStatus.ApiStatus())
		})
		return se.Next()
	})

	// only triggers on external API requests
	app.OnRecordCreateRequest("saft").BindFunc(func(e *core.RecordRequestEvent) error {

		// SAFT registration open?
		semester := e.Record.GetString("semester")
		if !regStatus.AcceptSubmission(semester) {
			return apis.NewForbiddenError("Registration is closed", nil)
		}

		// Submission by user?
		user_id := e.Record.GetString("user")
		var err error
		if user_id != "" {
			// verifies that user is authenticated
			// and copies user data for the registration
			err = copyUserDataToRecord(app, user_id, e)
		} else {
			// otherwise validate that bot question was answered correctly
			err = validateCaptchaLite(e)
		}
		if err != nil {
			return err
		}

		// Save image consent to DB
		postImages := e.Record.GetString("post_images")
		purpose := "saft" + regStatus.AcceptedSemester
		err = gdprConsent.CreateImageConsentRecord(app, e.Record.GetString("name"), e.Record.GetString("surname"), postImages, purpose)
		if err != nil {
			return err
		}

		// Send confirmation email to user
		err = sendSAFTConfirmationEmail(app, e)
		if err != nil {
			return err
		}

		return e.Next()
	})
}

func validateCaptchaLite(e *core.RecordRequestEvent) error {
	botData := struct {
		Answer string `json:"bot_question" form:"bot_question"`
	}{}
	err := e.BindBody(&botData)
	if err == nil && validateBotQuestion(botData.Answer) {
		return nil
	}
	// when that fails as well, show unauthenticated error
	// -> diverting bots & users from the fact, that a 'field' was missing
	return apis.NewUnauthorizedError("must be authenticated", nil)
}

// returns true when answer is as expected
// after toLower & removing all runes that are not in a-z
func validateBotQuestion(answer string) bool {
	expLen := len(BotQuestionExpected)
	actLen := len(answer)
	// also reject, when answer is way too long to be realistic
	if expLen > actLen || actLen > (2*expLen) {
		return false
	}
	var b strings.Builder
	b.Grow(actLen)
	for _, r := range strings.ToLower(answer) {
		if r >= 'a' && r <= 'z' {
			b.WriteRune(r)
		}
	}
	return b.String() == BotQuestionExpected
}

// is expected to fail when userId is invalid
// but not, when userId was just unset
// TODO (security) verify that the user with that id was authenticated during the request
func copyUserDataToRecord(app *pocketbase.PocketBase, userId string, e *core.RecordRequestEvent) error {
	if userId == "" {
		return nil
	}

	// Define how the output of the query below looks like
	type User struct {
		Id           string `db:"id" json:"id"`
		Name         string `db:"name" json:"name"`
		Surname      string `db:"surname" json:"surname"`
		Email        string `db:"email" json:"email"`
		Gender       string `db:"gender" json:"gender"`
		PhoneNumber  string `db:"phonenumber" json:"phonenumber"`
		Allergies    string `db:"allergies" json:"allergies"`
		IsVegetarian bool   `db:"vegetarian" json:"vegetarian"`
	}

	// Create empty user
	user := User{}

	err := app.DB().Select("id", "name", "email", "surname", "allergies", "vegetarian", "phonenumber", "gender").From("users").AndWhere(dbx.HashExp{"id": userId}).One(&user)
	// when looking up that user fails, forward error
	if err != nil {
		return err
	}

	// Set user data to record for template
	e.Record.Set("name", user.Name)
	e.Record.Set("surname", user.Surname)
	e.Record.Set("email", user.Email)
	e.Record.Set("allergies", user.Allergies)
	e.Record.Set("is_vegetarian", user.IsVegetarian)
	e.Record.Set("phonenumber", user.PhoneNumber)
	e.Record.Set("gender", user.Gender)

	return nil
}

func sendSAFTConfirmationEmail(app *pocketbase.PocketBase, e *core.RecordRequestEvent) error {

	registry := template.NewRegistry()

	html, err := registry.LoadFiles(
		"saft/saft_registration.html",
	).Render(map[string]any{
		"name":  e.Record.Get("name"),
		"email": OrgaEmail,
	})

	if err != nil {
		return err
	}

	message := &mailer.Message{
		From: mail.Address{
			Address: e.App.Settings().Meta.SenderAddress,
			Name:    e.App.Settings().Meta.SenderName,
		},
		To:      []mail.Address{{Address: e.Record.Email()}},
		Subject: Subject + regStatus.AcceptedSemester,
		HTML:    html,
		Headers: map[string]string{
			"Reply-To": OrgaEmail,
		},
	}
	e.App.NewMailClient().Send(message)
	return nil
}
