package main

import (
	"SMD-KA-Backend/contact"
	"SMD-KA-Backend/intern/prayer_box"
	_ "SMD-KA-Backend/migrations"
	"SMD-KA-Backend/regiokon"
	"SMD-KA-Backend/registration/authentik"
	registration "SMD-KA-Backend/registration/email"
	"SMD-KA-Backend/saft"
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/plugins/ghupdate"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func main() {
	app := pocketbase.New()

	if err := godotenv.Load(); err != nil {
		log.Println(".env not found, using OS environment")
	}

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
	regiokon.RegiokonEmail(app)
	contact.ContactForm(app)
	prayer_box.PrayerBoxForm(app)
	authentik.SetupAuthentik(app)

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
