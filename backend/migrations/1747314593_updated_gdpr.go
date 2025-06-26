package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2119335180")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_2119335180",
			"hidden": false,
			"id": "relation4245761728",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "updated_record",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2119335180")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("relation4245761728")

		return app.Save(collection)
	})
}
