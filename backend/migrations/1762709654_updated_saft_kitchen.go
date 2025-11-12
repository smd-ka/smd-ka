package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("05r3ecdi62xhor1")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "SELECT saft.id as id, COALESCE(users.name, saft.name) as name, COALESCE(users.allergies, saft.allergies) as allergies, saft.brings_cake,  CAST(COALESCE(users.vegetarian, saft.is_vegetarian) AS BOOL) as is_vegetarian\nfrom saft LEFT JOIN users on saft.user = users.id WHERE saft.semester='WS25/26' ORDER BY saft.allergies DESC\n"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_cuoQ")

		// remove field
		collection.Fields.RemoveById("_clone_8l4a")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "_clone_8YzS",
			"name": "brings_cake",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "bool3032385581",
			"name": "is_vegetarian",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("05r3ecdi62xhor1")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "SELECT saft.id as id, COALESCE(users.name, saft.name) as name, COALESCE(users.allergies, saft.allergies) as allergies, saft.brings_cake, saft.is_vegetarian from saft LEFT JOIN users on saft.user = users.id WHERE saft.semester='WS25/26' ORDER BY saft.allergies DESC\n"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "_clone_cuoQ",
			"name": "brings_cake",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "_clone_8l4a",
			"name": "is_vegetarian",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_8YzS")

		// remove field
		collection.Fields.RemoveById("bool3032385581")

		return app.Save(collection)
	})
}
