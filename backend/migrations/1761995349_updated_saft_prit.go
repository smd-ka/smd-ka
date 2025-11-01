package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("f23hb17yd2jbvoz")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "SELECT saft.id as id, COALESCE((users.name || ' ' || users.surname), (saft.name || ' ' || saft.surname)) as name, saft.post_images\nfrom saft LEFT JOIN users on saft.user = users.id WHERE saft.semester='WS25/26' ORDER BY name DESC\n"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_uZ3m")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "_clone_a6Vd",
			"maxSelect": 1,
			"name": "post_images",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"yes",
				"no_instagram",
				"no_website",
				"never"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("f23hb17yd2jbvoz")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "SELECT saft.id as id, COALESCE((users.name || ' ' || users.surname), (saft.name || ' ' || saft.surname)) as name, saft.post_images\nfrom saft LEFT JOIN users on saft.user = users.id WHERE saft.semester='SS25' ORDER BY name DESC\n"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "_clone_uZ3m",
			"maxSelect": 1,
			"name": "post_images",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"yes",
				"no_instagram",
				"no_website",
				"never"
			]
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_a6Vd")

		return app.Save(collection)
	})
}
