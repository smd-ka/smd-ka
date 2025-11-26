package regiokon

import (
	"net/mail"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/mailer"
	"github.com/pocketbase/pocketbase/tools/template"
)

func RegiokonEmail(app *pocketbase.PocketBase) {

	app.OnRecordCreate("regiokon").BindFunc(func(e *core.RecordEvent) error {

		Subject := "[SMD-KA] Regiokon26 - DU bist dabei!"
		// E-Mail-Adress for questions (see template)
		Email := "regiokon@smd-karlsruhe.de"

		registry := template.NewRegistry()

		html, err := registry.LoadFiles(
			"regiokon/regiokon_email.html",
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

		return e.Next()
	})
}
