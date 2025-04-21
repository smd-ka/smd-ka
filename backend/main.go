package main

import (
	"SMD-KA-Backend/contact"
	_ "SMD-KA-Backend/migrations"
	"SMD-KA-Backend/registration"
	"SMD-KA-Backend/saft"
	"bytes"
	"encoding/json"
	"errors"
	"io"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/ghupdate"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func main() {
	app := pocketbase.New()

	// Load env file
	// Note that app will not fail if no env is provided!
	err := godotenv.Load()
	if err != nil {
		app.Logger().Error(err.Error())
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
	contact.ContactForm(app)

	app.OnRecordAuthWithPasswordRequest().BindFunc(func(e *core.RecordAuthWithPasswordRequestEvent) error {
		if e.Record == nil {
			return errors.New("record is nil")
		}

		// Load bearer token from env
		bearerToken := os.Getenv("AUTHENTIK_BEARER_TOKEN")
		if bearerToken == "" {
			app.Logger().Error("API token is not set")
			return errors.New("missing bearer token")
		}

		url := "https://auth.smd-karlsruhe.de/api/v3/core/users/"
		method := "POST"

		// Construct the data that need to be sent to Authentik
		// We use the email address as the username in Authentik

		type Payload struct {
			Username string `json:"username"`
			Name     string `json:"name"`
			Email    string `json:"email"`
			Password string `json:"password"`
		}

		data := Payload{
			Username: e.Record.Email(),
			Name:     e.Record.GetString("name") + " " + e.Record.GetString("surname"),
			Email:    e.Record.Email(),
			Password: e.Password,
		}

		jsonData, err := json.Marshal(data)
		if err != nil {
			return err
		}

		req, err := http.NewRequest(method, url, bytes.NewReader(jsonData))
		if err != nil {
			return err
		}

		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("Accept", "application/json")
		req.Header.Set("Authorization", "Bearer "+bearerToken)

		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			app.Logger().Error("Failed to send request to Authentik:", err)
			return err
		}
		defer res.Body.Close()

		body, err := io.ReadAll(res.Body)
		if err != nil {
			app.Logger().Error("Failed to read Authentik response:", err)
			return err
		}

		app.Logger().Debug("Authentik response:", string(body))
		return e.Next()
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
