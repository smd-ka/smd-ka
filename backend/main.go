package main

import (
	"SMD-KA-Backend/contact"
	_ "SMD-KA-Backend/migrations"
	registration "SMD-KA-Backend/registration/email"
	"SMD-KA-Backend/saft"
	"log"
	"os"
	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/plugins/ghupdate"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
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

	// Register custom modules
	registration.SetupVerification(app)
	saft.SaftEmails(app)
	contact.ContactForm(app)
	// authentik.SetupAuthentik(app)

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
