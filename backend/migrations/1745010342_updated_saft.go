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
		if err := collection.Fields.AddMarshaledJSONAt(19, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text111070333",
			"max": 0,
			"min": 0,
			"name": "tents",
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
		if err := collection.Fields.AddMarshaledJSONAt(20, []byte(`{
			"hidden": false,
			"id": "bool515732239",
			"name": "pot",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(21, []byte(`{
			"hidden": false,
			"id": "bool2643021541",
			"name": "pad",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(22, []byte(`{
			"hidden": false,
			"id": "bool455239745",
			"name": "bag",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(23, []byte(`{
			"hidden": false,
			"id": "number2028955295",
			"max": null,
			"min": null,
			"name": "bag_count",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(24, []byte(`{
			"hidden": false,
			"id": "number3408991989",
			"max": null,
			"min": null,
			"name": "pad_count",
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
		collection.Fields.RemoveById("text111070333")

		// remove field
		collection.Fields.RemoveById("bool515732239")

		// remove field
		collection.Fields.RemoveById("bool2643021541")

		// remove field
		collection.Fields.RemoveById("bool455239745")

		// remove field
		collection.Fields.RemoveById("number2028955295")

		// remove field
		collection.Fields.RemoveById("number3408991989")

		return app.Save(collection)
	})
}
