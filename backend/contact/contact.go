package contact

import (
	"net/mail"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/mailer"
	"github.com/pocketbase/pocketbase/tools/template"
)

func ContactForm(app *pocketbase.PocketBase) {

	app.OnRecordCreate("contact").BindFunc(func(e *core.RecordEvent) error {

		Subject := "[SMD-KA] Kontaktformular"

		registry := template.NewRegistry()

		html, err := registry.LoadFiles(
			"contact/contact_confirm.html",
		).Render(map[string]any{
			"name": e.Record.Get("name"),
		})

		if err != nil {
			return err
		}

		messageSender := &mailer.Message{
			From: mail.Address{
				Address: e.App.Settings().Meta.SenderAddress,
				Name:    e.App.Settings().Meta.SenderName,
			},
			To:      []mail.Address{{Address: e.Record.Email()}},
			Subject: Subject,
			HTML:    html,
		}

		html, err = registry.LoadFiles(
			"contact/contact_notify.html",
		).Render(map[string]any{
			"name":    e.Record.Get("name"),
			"email":   e.Record.Email(),
			"subject": e.Record.Get("subject"),
			"message": e.Record.Get("message"),
		})

		if err != nil {
			return err
		}

		notificationMessage := &mailer.Message{
			From: mail.Address{
				Address: e.App.Settings().Meta.SenderAddress,
				Name:    e.App.Settings().Meta.SenderName,
			},
			To:      []mail.Address{{Address: "leiter@smd-karlsruhe.de"}},
			Bcc:     []mail.Address{{Address: "webmaster@smd-karlsruhe.de"}},
			Subject: Subject,
			HTML:    html,
		}
		e.App.NewMailClient().Send(notificationMessage)
		e.App.NewMailClient().Send(messageSender)

		return e.Next()
	})
}
