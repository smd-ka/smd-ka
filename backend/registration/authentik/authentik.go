package authentik

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

// handles communication with authentik our single sign on provider

func SetupAuthentik(app *pocketbase.PocketBase) {

	// Handle login requests
	// If user has not been registered in authentik, we create a new user
	// Else we just let the request pass through
	app.OnRecordAuthRefreshRequest().BindFunc(func(e *core.RecordAuthRefreshRequestEvent) error {

		if e.Record.GetBool("authentik_user_created") || !e.Record.GetBool("verified") {
			return e.Next()
		}

		// Load bearer token from env
		bearerToken := os.Getenv("AUTHENTIK_BEARER_TOKEN")
		if bearerToken == "" {
			return errors.New("missing AUTHENTIK_BEARER_TOKEN token. Did you set it in the env?")
		}
		// bearer token prefix can be used to disable integration dynamically
		if strings.HasPrefix(bearerToken, "DISABLED:") {
			app.Logger().Info(fmt.Sprintf("ignoring Authentik integration as AUTHENTIK_BEARER_TOKEN is set to %q", bearerToken))
			return e.Next()
		}

		name := e.Record.GetString("name") + " " + e.Record.GetString("surname")
		userId, err := createUser(e.Record.Email(), name, bearerToken)

		if err != nil {
			return err
		}

		app.Logger().Info(fmt.Sprintf("User created in Authentik with ID: %d", userId))

		setPassword(userId, e.Record.GetString("password"), bearerToken)

		// Mark user so that this logic does not execute again
		e.Record.Set("authentik_user_created", true)
		app.Save(e.Record)

		return e.Next()

	})

	app.OnRecordAuthWithPasswordRequest().BindFunc(func(e *core.RecordAuthWithPasswordRequestEvent) error {

		if e.Record.GetBool("authentik_user_created") || !e.Record.GetBool("verified") {
			return e.Next()
		}

		// Load bearer token from env
		bearerToken := os.Getenv("AUTHENTIK_BEARER_TOKEN")
		if bearerToken == "" {
			return errors.New("missing AUTHENTIK_BEARER_TOKEN token. Did you set it in the env?")
		}
		// bearer token prefix can be used to disable integration dynamically
		if strings.HasPrefix(bearerToken, "DISABLED:") {
			app.Logger().Info(fmt.Sprintf("ignoring Authentik integration as AUTHENTIK_BEARER_TOKEN is set to %q", bearerToken))
			return e.Next()
		}

		name := e.Record.GetString("name") + " " + e.Record.GetString("surname")
		userId, err := createUser(e.Record.Email(), name, bearerToken)

		if err != nil {
			return err
		}

		app.Logger().Info(fmt.Sprintf("User created in Authentik with ID: %d", userId))

		setPassword(userId, e.Password, bearerToken)

		// Mark user so that this logic does not execute again
		e.Record.Set("authentik_user_created", true)
		app.Save(e.Record)

		return e.Next()
	})

}

// returns userId
func createUser(email string, name string, token string) (int64, error) {
	url := "https://auth.smd-karlsruhe.de/api/v3/core/users/"
	method := "POST"

	type Payload struct {
		Username string   `json:"username"`
		Name     string   `json:"name"`
		Email    string   `json:"email"`
		Groups   []string `json:"groups"`
	}

	// We use the email address as the username in Authentik
	data := Payload{
		Username: email,
		Name:     name,
		Email:    email,
		Groups:   []string{"3433464444974bbd8caad0c006453134"}, // Add the user to the "SMD" group
	}

	jsonData, err := json.Marshal(data)
	if err != nil {
		return 0, err
	}

	req, err := http.NewRequest(method, url, bytes.NewReader(jsonData))
	if err != nil {
		return 0, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Authorization", "Bearer "+token)

	client := &http.Client{}

	res, err := client.Do(req)
	if err != nil {
		return 0, err
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return 0, err
	}

	var resp struct {
		ID int64 `json:"pk"`
	}
	if err := json.Unmarshal(body, &resp); err != nil {
		return 0, err
	}
	return resp.ID, nil
}

func setPassword(userId int64, password string, token string) error {

	url := "https://auth.smd-karlsruhe.de/api/v3/core/users/" + fmt.Sprintf("%d", userId) + "/set_password/"
	method := "POST"

	type SetPasswordPayload struct {
		Password string `json:"password"`
	}

	pwData := SetPasswordPayload{
		Password: password,
	}

	jsonData, err := json.Marshal(pwData)
	if err != nil {
		return err
	}

	client := &http.Client{}
	req, err := http.NewRequest(method, url, bytes.NewReader(jsonData))

	if err != nil {
		return err
	}
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Authorization", "Bearer "+token)

	res, err := client.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	// _, err = io.ReadAll(res.Body)
	if err != nil {
		return err
	}
	return nil
}
