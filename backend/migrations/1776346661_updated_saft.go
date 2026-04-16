package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("vjp3hff1xatw8k8")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(26, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text3376000399",
			"max": 0,
			"min": 0,
			"name": "side_dish",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(27, []byte(`{
			"hidden": false,
			"id": "bool834372152",
			"name": "fairy_lights",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(28, []byte(`{
			"hidden": false,
			"id": "number4106390168",
			"max": 5,
			"min": 1,
			"name": "likes_cooking",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("vjp3hff1xatw8k8")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("text3376000399")

		// remove field
		collection.Fields.RemoveById("bool834372152")

		// remove field
		collection.Fields.RemoveById("number4106390168")

		return app.Save(collection)
	})
}
