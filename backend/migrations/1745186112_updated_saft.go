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
		if err := collection.Fields.AddMarshaledJSONAt(25, []byte(`{
			"hidden": false,
			"id": "bool602556812",
			"name": "comes_friday",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
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
		collection.Fields.RemoveById("bool602556812")

		return app.Save(collection)
	})
}
