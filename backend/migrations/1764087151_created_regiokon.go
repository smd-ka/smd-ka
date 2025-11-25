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
					"autogeneratePattern": "[a-z0-9]{15}",
					"hidden": false,
					"id": "text3208210256",
					"max": 15,
					"min": 15,
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
					"id": "text1579384326",
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
					"id": "text3883309839",
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
					"exceptDomains": null,
					"hidden": false,
					"id": "email3885137012",
					"name": "email",
					"onlyDomains": null,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "email"
				},
				{
					"hidden": false,
					"id": "select3343321666",
					"maxSelect": 1,
					"name": "gender",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"female",
						"male"
					]
				},
				{
					"hidden": false,
					"id": "select1292517336",
					"maxSelect": 1,
					"name": "smd_group",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"Darmstadt",
						"Esslingen",
						"Freiburg",
						"Germersheim",
						"Heidelberg",
						"Hohenheim",
						"Kaiserslautern",
						"Karlsruhe",
						"Konstanz",
						"Landau",
						"Ludwigsburg",
						"Main",
						"Mannheim",
						"Nürtingen",
						"Stuttgart",
						"Trier",
						"Tübingen",
						"Weingarten",
						"Wiesbaden"
					]
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text904918383",
					"max": 0,
					"min": 0,
					"name": "travel_comments",
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
					"id": "text302937193",
					"max": 0,
					"min": 0,
					"name": "question1",
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
					"id": "text2332501459",
					"max": 0,
					"min": 0,
					"name": "question2",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "bool3032385581",
					"name": "is_vegetarian",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "bool"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text2367274779",
					"max": 0,
					"min": 0,
					"name": "allergies",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "select3288655999",
					"maxSelect": 1,
					"name": "image_publication_consent",
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
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text1604228650",
					"max": 0,
					"min": 0,
					"name": "comments",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "autodate2990389176",
					"name": "created",
					"onCreate": true,
					"onUpdate": false,
					"presentable": false,
					"system": false,
					"type": "autodate"
				},
				{
					"hidden": false,
					"id": "autodate3332085495",
					"name": "updated",
					"onCreate": true,
					"onUpdate": true,
					"presentable": false,
					"system": false,
					"type": "autodate"
				}
			],
			"id": "pbc_4243366050",
			"indexes": [],
			"listRule": null,
			"name": "regiokon",
			"system": false,
			"type": "base",
			"updateRule": null,
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4243366050")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
