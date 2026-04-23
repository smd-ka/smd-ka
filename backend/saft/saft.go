package saft

import (
	"net/http"
	"net/mail"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/mailer"
	"github.com/pocketbase/pocketbase/tools/template"

	"SMD-KA-Backend/gdprConsent"
	"SMD-KA-Backend/saft/regStatus"
)

// Constants for SAFT registration emails
const (
	Subject   = "[SMD-KA] SAFT Anmeldung "
	OrgaEmail = "inreach@smd-karlsruhe.de"
)

func SaftEmails(app *pocketbase.PocketBase) {

	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.GET("/api/saft/registration-status", func(e *core.RequestEvent) error {
			return e.JSON(http.StatusOK, regStatus.ApiStatus())
		})
		return se.Next()
	})

	app.OnRecordCreate("saft").BindFunc(func(e *core.RecordEvent) error {

		// SAFT registration open?
		semester := e.Record.GetString("semester")
		if !regStatus.AcceptSubmission(semester) {
			return apis.NewForbiddenError("Registration is closed", nil)
		}

		// Submission by user?
		user_id := e.Record.GetString("user")
		err := copyUserDataToRecord(app, user_id, e)
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

func copyUserDataToRecord(app *pocketbase.PocketBase, userId string, e *core.RecordEvent) error {
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

func sendSAFTConfirmationEmail(app *pocketbase.PocketBase, e *core.RecordEvent) error {

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
