package gdpr

import (
	"time"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

// Make sure to create a chain of records if the gdpr record is updated.
func UpdateGDPRRecord(app *pocketbase.PocketBase) {

	app.OnRecordAfterCreateSuccess("gdpr").BindFunc(func(e *core.RecordEvent) error {
		userId := e.Record.Get("user")
		if userId == nil {
			return e.Next()
		}

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
