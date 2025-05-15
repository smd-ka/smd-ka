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
			"name": "prit",
			"viewQuery": "SELECT\n  users.id AS id,\n  COALESCE(users.name || ' ' || users.surname, saft.name || ' ' || saft.surname) AS name,\n  COALESCE(users.gdpr, saft.gdpr) AS gdpr\nFROM users\nLEFT JOIN (\n  SELECT\n    user,\n    MAX(name) AS name,\n    MAX(surname) AS surname,\n    MAX(gdpr) AS gdpr\n  FROM saft\n  GROUP BY user\n) saft ON saft.user = users.id\nORDER BY name DESC;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_dRKF")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "json1499404988",
			"maxSize": 1,
			"name": "gdpr",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
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
			"name": "saft_prit",
			"viewQuery": "SELECT saft.id as id, COALESCE((users.name || ' ' || users.surname), (saft.name || ' ' || saft.surname)) as name, saft.gdpr\nfrom saft LEFT JOIN users on saft.user = users.id WHERE saft.semester='SS25' ORDER BY name DESC\n"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "_clone_dRKF",
			"maxSelect": 1,
			"name": "gdpr",
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
		collection.Fields.RemoveById("json1499404988")

		return app.Save(collection)
	})
}
