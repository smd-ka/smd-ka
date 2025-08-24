package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("vcqdyzm1pq5e01u")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "nf40y9gd",
			"maxSelect": 1,
			"name": "category",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"erstsemesteraktion",
				"kingscafe",
				"smd_abend",
				"MIT",
				"lecture_talk",
				"german_bible_study",
				"chruch_hopping"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("vcqdyzm1pq5e01u")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "nf40y9gd",
			"maxSelect": 1,
			"name": "category",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"erstsemesteraktion",
				"kingscafe",
				"smd_abend",
				"MIT",
				"lecture_talk",
				"german_bible_study"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
