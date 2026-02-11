package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(25, []byte(`{
			"hidden": false,
			"id": "select2429410629",
			"maxSelect": 1,
			"name": "church",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"CG",
				"LKG",
				"EMK",
				"ICF",
				"FEG",
				"EFG",
				"TL",
				"FK",
				"PERDU",
				"AGAPE"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(25, []byte(`{
			"hidden": false,
			"id": "select2429410629",
			"maxSelect": 1,
			"name": "church",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"CG",
				"LKG",
				"EMK",
				"ICF",
				"FEG",
				"EFG",
				"TL",
				"FK"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
