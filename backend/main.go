package main

import (
	"log"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/ghupdate"
	"github.com/pocketbase/pocketbase/tools/template"
)

func main() {
	app := pocketbase.New()

	// GitHub selfupdate
	ghupdate.MustRegister(app, app.RootCmd, ghupdate.Config{})


    app.OnMailerRecordVerificationSend().BindFunc(func(e *core.MailerRecordEvent) error {
        app.Logger().Debug("Hello")
        e.Message.Subject = "[SMD-KA] Willkommen"
        
        registry := template.NewRegistry()


        html, err := registry.LoadFiles(
            "email_templates/register_client.html",
        ).Render(map[string]any{
            "name": e.Record.Get("name"),
        })

        if err != nil {
            return err
        }

        e.Message.HTML = html

        return e.Next()
    })

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

