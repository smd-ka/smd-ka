package gdpr

import (
	"fmt"
	"time"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

// Make sure to create a chain of records if the gdpr record is updated.
func UpdateGDPRRecord(app *pocketbase.PocketBase) {

	// TODO: must be same purpose!!
	// Using after Create as the ID of the record is not available before
	// TODO: Frontend Commit Hash

	app.OnRecordAfterCreateSuccess("gdpr").BindFunc(func(e *core.RecordEvent) error {
		userId := e.Record.Get("user")
		if userId == nil {
			return e.Next()
		}

		// Set the name and surname of the user programmatically
		userRecord, err := app.FindRecordById("users", userId.(string))
		if err != nil {
			return err
		}
		firstName := userRecord.GetString("name")
		surname := userRecord.GetString("surname")

		e.Record.Set("name", firstName)
		e.Record.Set("surname", surname)
		app.Save(e.Record)

		// Establish a connection to the previous record
		// Get the last record for the user with the same purpose
		filter := fmt.Sprint("user = '", userId.(string), "' && purpose='", e.Record.GetString("purpose"), "'")
		records, err := app.FindRecordsByFilter("gdpr", filter, "-created", 1, 1)
		if err != nil {
			return err
		}

		var record *core.Record
		if len(records) > 0 {
			record = records[0]
		}

		if record != nil {
			record.Set("withdrawal_date", time.Now())
			record.Set("updated_record", e.Record.Id)
			err := app.Save(record)
			if err != nil {
				return err
			}
		}

		return e.Next()
	})

	app.OnRecordCreate("users").BindFunc(func(e *core.RecordEvent) error {
		// Check if the user has already agreed to the GDPR terms and conditions
		gdprValue := e.Record.GetBool("gdpr")
		if !gdprValue {
			// TODO: custom error response
			return fmt.Errorf("GDPR terms and conditions must be accepted before creating a user")
		}
		// If the user has agreed, we can proceed with the creation
		// Remove the gdpr field from the record to avoid storing it in the database
		e.Record.Set("gdpr", nil)
		return e.Next()

	})

	// Prerequisite: The user has already agreed to the GDPR terms and conditions when the request is made to create a new user.
	app.OnRecordAfterCreateSuccess("users").BindFunc(func(e *core.RecordEvent) error {

		collection, err := app.FindCollectionByNameOrId("gdpr")
		if err != nil {
			return err
		}

		// Create a new GDPR record for the user
		gdprRecord := core.NewRecord(collection)
		gdprRecord.Set("user", e.Record.Id)
		// TODO set frontend commit hash
		gdprRecord.Set("purpose", "intern_data")
		gdprRecord.Set("permission", "approved")
		gdprRecord.Set("name", e.Record.GetString("name"))
		gdprRecord.Set("surname", e.Record.GetString("surname"))

		fmt.Printf("Creating GDPR record: %+v\n", gdprRecord)

		err = app.Save(gdprRecord)
		if err != nil {
			return err
		}

		return e.Next()
	})

}
