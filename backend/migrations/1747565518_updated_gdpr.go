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
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "select3762918058",
			"maxSelect": 1,
			"name": "permission",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"denied",
				"approved",
				"website",
				"instagram"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"hidden": false,
			"id": "select3095901163",
			"maxSelect": 1,
			"name": "purpose",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"intern_data",
				"pr_images"
			]
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
		collection.Fields.RemoveById("select3762918058")

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"hidden": false,
			"id": "select3095901163",
			"maxSelect": 1,
			"name": "purpose",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"intern_area",
				"publish_images",
				"publish_images_instagram",
				"publish_images_website"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
