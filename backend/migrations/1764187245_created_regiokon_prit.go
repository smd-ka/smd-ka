package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
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
					"autogeneratePattern": "",
					"hidden": false,
					"id": "_clone_vlbH",
					"max": 0,
					"min": 0,
					"name": "name",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "_clone_4mEF",
					"max": 0,
					"min": 0,
					"name": "surname",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "_clone_qYbe",
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
				},
				{
					"hidden": false,
					"id": "_clone_drND",
					"name": "revoked",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "bool"
				}
			],
			"id": "pbc_168760937",
			"indexes": [],
			"listRule": null,
			"name": "regiokon_prit",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "SELECT \ngdpr_images.id as id, \ngdpr_images.name,\ngdpr_images.surname,\ngdpr_images.permission,\ngdpr_images.revoked\nfrom gdpr_images WHERE gdpr_images.purpose='regiokon' ORDER BY name DESC\n",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_168760937")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
