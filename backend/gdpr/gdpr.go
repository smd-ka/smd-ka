package gdpr

import (
	"time"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

// Make sure to create a chain of records if the gdpr record is updated.
func UpdateGDPRRecord(app *pocketbase.PocketBase) {

	// TODO: must be same purpose!!
	// Using after Create as the ID of the record is not available before
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
		// Offset is set to 1 since we want to get the last record before the one that was just created
		records, err := app.FindRecordsByFilter("gdpr", "user = '"+userId.(string)+"'", "-created", 1, 1)
		if err != nil {
			return err
		}

		var record *core.Record
		if len(records) > 0 {
			record = records[0]
		}

		if record != nil {
			app.Logger().Debug(record.Id)
			record.Set("withdrawal_date", time.Now())
			record.Set("updated_record", e.Record.Id)
			err := app.Save(record)
			if err != nil {
				return err
			}
		}

		return e.Next()
	})

}
