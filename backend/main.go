package main

import (
	"encoding/json"
	"log"
	"net/mail"
	"os"
	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/ghupdate"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
	"github.com/pocketbase/pocketbase/tools/mailer"
	"github.com/pocketbase/pocketbase/tools/template"
)

func main() {
	app := pocketbase.New()

	// GitHub selfupdate
	ghupdate.MustRegister(app, app.RootCmd, ghupdate.Config{})

    // loosely check if it was executed using "go run"
    isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())

    migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
        // enable auto creation of migration files when making collection changes in the Dashboard
        // (the isGoRun check is to enable it only during development)
        Automigrate: isGoRun,
    })


    app.OnMailerRecordVerificationSend().BindFunc(func(e *core.MailerRecordEvent) error {
        app.Logger().Debug("Hello")
        
        registry := template.NewRegistry()
        
        // Overwrite System Verification email as there should be no verification link within!
        // We use the verified property to mark the users that have been verified as know by the SMD KA
        e.Message.Subject = "[SMD-KA] Willkommen"
        html, err := registry.LoadFiles(
            "email_templates/register_client.html",
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
            "email_templates/register_verification.html",
        ).Render(map[string]any{
            "record": string(recordAsJson),
            "link": e.App.Settings().Meta.AppURL + "/_/#/auth/confirm-verification/" + e.Meta["token"].(string),
        })
        if err != nil {
            return err
        }

        message := &mailer.Message {
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

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

