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

		return app.Delete(collection)
	}, func(app core.App) error {
		jsonData := `{
			"createRule": null,
			"deleteRule": null,
			"fields": [
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text3208210256",
					"max": 0,
					"min": 0,
					"name": "id",
					"pattern": "^[a-z0-9]+$",
					"presentable": false,
					"primaryKey": true,
					"required": true,
					"system": true,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "json1579384326",
					"maxSize": 1,
					"name": "name",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "json1499404988",
					"maxSize": 1,
					"name": "gdpr",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				}
			],
			"id": "f23hb17yd2jbvoz",
			"indexes": [],
			"listRule": "@request.auth.roles.id ?~ 'pritresponsable'",
			"name": "prit",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "SELECT\n  users.id AS id,\n  COALESCE(users.name || ' ' || users.surname, saft.name || ' ' || saft.surname) AS name,\n  COALESCE(users.gdpr, saft.gdpr) AS gdpr\nFROM users\nLEFT JOIN (\n  SELECT\n    user,\n    MAX(name) AS name,\n    MAX(surname) AS surname,\n    MAX(gdpr) AS gdpr\n  FROM saft\n  GROUP BY user\n) saft ON saft.user = users.id\nORDER BY name DESC;",
			"viewRule": ""
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
