package registration

import (
	"encoding/json"
	"net/mail"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/mailer"
	"github.com/pocketbase/pocketbase/tools/template"
)

func SetupVerification(app *pocketbase.PocketBase) {

	app.OnMailerRecordVerificationSend().BindFunc(func(e *core.MailerRecordEvent) error {

		registry := template.NewRegistry()

		// Overwrite System Verification email as there should be no verification link within!
		// We use the verified property to mark the users that have been verified as know by the SMD KA
		e.Message.Subject = "[SMD-KA] Willkommen"
		// Note that file paths are relative to the main.go
		html, err := registry.LoadFiles(
			"registration/register_client.html",
		).Render(map[string]any{
			"name": e.Record.Get("name"),
		})
		if err != nil {
			return err
		}
		e.Message.HTML = html

		//Send Verification request email to admins
		recordAsJson, err := json.Marshal(e.Record)
		if err != nil {
			return err
		}
		html, err = registry.LoadFiles(
			"registration/register_verification.html",
		).Render(map[string]any{
			"record": string(recordAsJson),
			"link":   e.App.Settings().Meta.AppURL + "/_/#/auth/confirm-verification/" + e.Meta["token"].(string),
		})
		if err != nil {
			return err
		}

		message := &mailer.Message{
			From: mail.Address{
				Address: e.App.Settings().Meta.SenderAddress,
				Name:    e.App.Settings().Meta.SenderName,
			},
			To:      []mail.Address{{Address: e.App.Settings().Meta.SenderAddress}},
			Subject: "[SMD-KA] Registrierung von " + e.Record.Get("name").(string),
			HTML:    html,
		}

		e.App.NewMailClient().Send(message)

		return e.Next()
	})

	// Notify user once verified that he is able to use the SMD-KA now
	app.OnRecordConfirmVerificationRequest().BindFunc(func(e *core.RecordConfirmVerificationRequestEvent) error {

		// TODO: create authentik account once user has been verified

		registry := template.NewRegistry()

		html, err := registry.LoadFiles(
			"registration/client_verified.html",
		).Render(map[string]any{
			"name": e.Record.Get("name"),
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
			Subject: "[SMD-KA] Du wurdest verifiziert",
			HTML:    html,
		}

		e.App.NewMailClient().Send(message)

		return e.Next()
	})
}
