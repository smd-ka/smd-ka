package saft

import (
	"net/mail"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/mailer"
	"github.com/pocketbase/pocketbase/tools/template"
)

func SaftEmails(app *pocketbase.PocketBase) {

	app.OnRecordCreate("saft").BindFunc(func(e *core.RecordEvent) error {

		Subject := "[SMD-KA] SAFT Anmeldung WS25/26"

		// E-Mail-Adress for questions (see template)
		Email := "inreach@smd-karlsruhe.de"

		registry := template.NewRegistry()

		user_id := e.Record.GetString("user")
		if user_id != "" {

			// Define how the output of the query below looks like
			type User struct {
				Id    string `db:"id" json:"id"`
				Name  string `db:"name" json:"name"`
				Email string `db:"email" json:"email"`
			}

			// Create empty user
			user := User{}

			app.DB().Select("id", "name", "email").From("users").AndWhere(dbx.Like("id", user_id)).One(&user)

			html, err := registry.LoadFiles(
				"saft/saft_registration.html",
			).Render(map[string]any{
				"name":  user.Name,
				"email": Email,
			})

			if err != nil {
				return err
			}

			message := &mailer.Message{
				From: mail.Address{
					Address: e.App.Settings().Meta.SenderAddress,
					Name:    e.App.Settings().Meta.SenderName,
				},
				To:      []mail.Address{{Address: user.Email}},
				Subject: Subject,
				HTML:    html,
			}
			e.App.NewMailClient().Send(message)

		} else {

			html, err := registry.LoadFiles(
				"saft/saft_registration.html",
			).Render(map[string]any{
				"name":  e.Record.Get("name"),
				"email": Email,
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
				Subject: Subject,
				HTML:    html,
			}
			e.App.NewMailClient().Send(message)
		}

		return e.Next()
	})
}
