package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4243366050")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
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
				"Wiesbaden",
				"Weitere"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4243366050")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
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
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
