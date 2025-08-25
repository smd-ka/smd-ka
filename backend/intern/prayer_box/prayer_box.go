package prayer_box

import (
	"errors"
	"fmt"
	"net/http"
	"net/mail"
	"os"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/mailer"
	"github.com/pocketbase/pocketbase/tools/template"
)

func PrayerBoxForm(app *pocketbase.PocketBase) {
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.POST("/api/intern/prayer-box", func(e *core.RequestEvent) error {

			if e.Auth == nil {
				return e.UnauthorizedError("Authorization required", nil)
			}

			data := struct {
				Message string `json:"message" form:"message"`
			}{}

			if err := e.BindBody(&data); err != nil {
				return e.BadRequestError("Failed to read request data", err)
			}

			Subject := "[SMD-KA] Gebetsbox über internen Bereich"

			registry := template.NewRegistry()

			html, err := registry.LoadFiles(
				"intern/prayer_box/prayer_box_mail.html",
			).Render(map[string]any{
				"message": data.Message,
			})

			if err != nil {
				return err
			}

			prayerBoxTarget := os.Getenv("SMD_PRAYER_BOX_TARGET")
			if prayerBoxTarget == "" {
				return errors.New("missing prayer box target. Did you set it in the env?")
			}

			if prayerBoxTarget == "LOG" {
				app.Logger().Info(fmt.Sprintf("Received following message via Prayer Box: %s", data.Message))
			} else {
				notificationMessage := &mailer.Message{
					From: mail.Address{
						Address: e.App.Settings().Meta.SenderAddress,
						Name:    e.App.Settings().Meta.SenderName,
					},
					To:      []mail.Address{{Address: prayerBoxTarget}},
					Subject: Subject,
					HTML:    html,
				}
				e.App.NewMailClient().Send(notificationMessage)
			}

			return e.JSON(http.StatusOK, map[string]bool{"success": true})

		})
		return se.Next()
	})
}
