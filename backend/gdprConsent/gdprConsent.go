package gdprConsent

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func CreateImageConsentRecord(app *pocketbase.PocketBase, name string, surname string, postImages string) error {

	collection, err := app.FindCollectionByNameOrId("gdpr_images")
	if err != nil {
		return err
	}

	record := core.NewRecord(collection)
	record.Set("name", name)
	record.Set("surname", surname)
	record.Set("purpose", "saft")
	record.Set("permission", postImages)
	record.Set("revoked", false)

	err = app.Save(record)
	if err != nil {
		return err
	}

	return nil
}
