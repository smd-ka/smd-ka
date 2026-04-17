package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_168760937")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "SELECT \ngdpr_images.id as id, \ngdpr_images.name,\ngdpr_images.surname,\ngdpr_images.permission,\ngdpr_images.revoked\nfrom gdpr_images WHERE gdpr_images.purpose = 'regiokon' ORDER BY name DESC\n"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_iS4m")

		// remove field
		collection.Fields.RemoveById("_clone_QclW")

		// remove field
		collection.Fields.RemoveById("_clone_XnAP")

		// remove field
		collection.Fields.RemoveById("_clone_HTnX")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_f6gL",
			"max": 0,
			"min": 0,
			"name": "name",
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
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_9Xjf",
			"max": 0,
			"min": 0,
			"name": "surname",
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
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "_clone_Dc6k",
			"maxSelect": 1,
			"name": "permission",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"yes",
				"no_instagram",
				"no_website",
				"no"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "_clone_Q6GU",
			"name": "revoked",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_168760937")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "SELECT \ngdpr_images.id as id, \ngdpr_images.name,\ngdpr_images.surname,\ngdpr_images.permission,\ngdpr_images.revoked\nfrom gdpr_images ORDER BY name DESC\n"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_iS4m",
			"max": 0,
			"min": 0,
			"name": "name",
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
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_QclW",
			"max": 0,
			"min": 0,
			"name": "surname",
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
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "_clone_XnAP",
			"maxSelect": 1,
			"name": "permission",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"yes",
				"no_instagram",
				"no_website",
				"no"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "_clone_HTnX",
			"name": "revoked",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_f6gL")

		// remove field
		collection.Fields.RemoveById("_clone_9Xjf")

		// remove field
		collection.Fields.RemoveById("_clone_Dc6k")

		// remove field
		collection.Fields.RemoveById("_clone_Q6GU")

		return app.Save(collection)
	})
}
