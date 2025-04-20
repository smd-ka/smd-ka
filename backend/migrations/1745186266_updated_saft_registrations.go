package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("skzm3nv3gicpo9z")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "SELECT \n  saft.id as id, saft.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), \n  (saft.name || ' ' || saft.surname)) AS TEXT) as name,\n  CAST(COALESCE(users.email, saft.email) AS TEXT) as email,\n  CAST(COALESCE(users.gender, saft.gender) AS TEXT) as gender,\n  CAST(COALESCE(users.phonenumber, saft.phonenumber) AS TEXT) as phonenumber,\n  saft.travel_option, saft.travel_comments, saft.[group],\n  saft.ticket, saft.brings_cake,\n  CAST(COALESCE(users.vegetarian, saft.is_vegetarian) AS BOOL) as is_vegetarian,\n  CAST(COALESCE(users.allergies, saft.allergies) AS TEXT) as allergies, \n  saft.would_sleep_on_floor, saft.semester, saft.comments, saft.post_images,\n  saft.pot, saft.bag, saft.bag_count, saft.pad, saft.pad_count, saft.tents, saft.comes_friday\n  from saft LEFT JOIN users on saft.user = users.id WHERE semester='SS25' ORDER BY name \n\n"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_Zv25")

		// remove field
		collection.Fields.RemoveById("_clone_lrn3")

		// remove field
		collection.Fields.RemoveById("_clone_nCFy")

		// remove field
		collection.Fields.RemoveById("_clone_X8Dl")

		// remove field
		collection.Fields.RemoveById("_clone_rFnN")

		// remove field
		collection.Fields.RemoveById("_clone_9lwk")

		// remove field
		collection.Fields.RemoveById("_clone_LWae")

		// remove field
		collection.Fields.RemoveById("_clone_eoOP")

		// remove field
		collection.Fields.RemoveById("_clone_w941")

		// remove field
		collection.Fields.RemoveById("_clone_hz3E")

		// remove field
		collection.Fields.RemoveById("_clone_UCx8")

		// remove field
		collection.Fields.RemoveById("_clone_Ohjq")

		// remove field
		collection.Fields.RemoveById("_clone_BLhF")

		// remove field
		collection.Fields.RemoveById("_clone_0bcJ")

		// remove field
		collection.Fields.RemoveById("_clone_M8lJ")

		// remove field
		collection.Fields.RemoveById("_clone_55Wg")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "_clone_37V4",
			"name": "paid",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"hidden": false,
			"id": "_clone_woJA",
			"maxSelect": 1,
			"name": "travel_option",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"takesBike",
				"takesTrain",
				"takesCar",
				"takesOwn",
				"takesGroup"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_BfWL",
			"max": 0,
			"min": 0,
			"name": "travel_comments",
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
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "_clone_SsVS",
			"maxSelect": 1,
			"name": "group",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"Karlsruhe",
				"Landau"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_ul3Z",
			"max": 0,
			"min": 0,
			"name": "ticket",
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
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"hidden": false,
			"id": "_clone_zVJ5",
			"name": "brings_cake",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(13, []byte(`{
			"hidden": false,
			"id": "_clone_n4pw",
			"name": "would_sleep_on_floor",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(14, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_hnWL",
			"max": 0,
			"min": 0,
			"name": "semester",
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
		if err := collection.Fields.AddMarshaledJSONAt(15, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_qBRc",
			"max": 0,
			"min": 0,
			"name": "comments",
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
		if err := collection.Fields.AddMarshaledJSONAt(16, []byte(`{
			"hidden": false,
			"id": "_clone_b4Hj",
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

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(17, []byte(`{
			"hidden": false,
			"id": "_clone_CPUq",
			"name": "pot",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(18, []byte(`{
			"hidden": false,
			"id": "_clone_7ObM",
			"name": "bag",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(19, []byte(`{
			"hidden": false,
			"id": "_clone_HKHT",
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
		if err := collection.Fields.AddMarshaledJSONAt(20, []byte(`{
			"hidden": false,
			"id": "_clone_Bww5",
			"name": "pad",
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
			"id": "_clone_ljg2",
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

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(22, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_5wud",
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
		if err := collection.Fields.AddMarshaledJSONAt(23, []byte(`{
			"hidden": false,
			"id": "_clone_xxrO",
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
		collection, err := app.FindCollectionByNameOrId("skzm3nv3gicpo9z")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "SELECT \n  saft.id as id, saft.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), \n  (saft.name || ' ' || saft.surname)) AS TEXT) as name,\n  CAST(COALESCE(users.email, saft.email) AS TEXT) as email,\n  CAST(COALESCE(users.gender, saft.gender) AS TEXT) as gender,\n  CAST(COALESCE(users.phonenumber, saft.phonenumber) AS TEXT) as phonenumber,\n  saft.travel_option, saft.travel_comments, saft.[group],\n  saft.ticket, saft.brings_cake,\n  CAST(COALESCE(users.vegetarian, saft.is_vegetarian) AS BOOL) as is_vegetarian,\n  CAST(COALESCE(users.allergies, saft.allergies) AS TEXT) as allergies, \n  saft.would_sleep_on_floor, saft.semester, saft.comments, saft.post_images,\n  saft.pot, saft.bag, saft.bag_count, saft.pad, saft.pad_count, saft.tents\n  from saft LEFT JOIN users on saft.user = users.id WHERE semester='SS25' ORDER BY name \n\n"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "_clone_Zv25",
			"name": "paid",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"hidden": false,
			"id": "_clone_lrn3",
			"maxSelect": 1,
			"name": "travel_option",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"takesBike",
				"takesTrain",
				"takesCar",
				"takesOwn",
				"takesGroup"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_nCFy",
			"max": 0,
			"min": 0,
			"name": "travel_comments",
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
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "_clone_X8Dl",
			"maxSelect": 1,
			"name": "group",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"Karlsruhe",
				"Landau"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_rFnN",
			"max": 0,
			"min": 0,
			"name": "ticket",
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
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"hidden": false,
			"id": "_clone_9lwk",
			"name": "brings_cake",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(13, []byte(`{
			"hidden": false,
			"id": "_clone_LWae",
			"name": "would_sleep_on_floor",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(14, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_eoOP",
			"max": 0,
			"min": 0,
			"name": "semester",
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
		if err := collection.Fields.AddMarshaledJSONAt(15, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_w941",
			"max": 0,
			"min": 0,
			"name": "comments",
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
		if err := collection.Fields.AddMarshaledJSONAt(16, []byte(`{
			"hidden": false,
			"id": "_clone_hz3E",
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

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(17, []byte(`{
			"hidden": false,
			"id": "_clone_UCx8",
			"name": "pot",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(18, []byte(`{
			"hidden": false,
			"id": "_clone_Ohjq",
			"name": "bag",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(19, []byte(`{
			"hidden": false,
			"id": "_clone_BLhF",
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
		if err := collection.Fields.AddMarshaledJSONAt(20, []byte(`{
			"hidden": false,
			"id": "_clone_0bcJ",
			"name": "pad",
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
			"id": "_clone_M8lJ",
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

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(22, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_55Wg",
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

		// remove field
		collection.Fields.RemoveById("_clone_37V4")

		// remove field
		collection.Fields.RemoveById("_clone_woJA")

		// remove field
		collection.Fields.RemoveById("_clone_BfWL")

		// remove field
		collection.Fields.RemoveById("_clone_SsVS")

		// remove field
		collection.Fields.RemoveById("_clone_ul3Z")

		// remove field
		collection.Fields.RemoveById("_clone_zVJ5")

		// remove field
		collection.Fields.RemoveById("_clone_n4pw")

		// remove field
		collection.Fields.RemoveById("_clone_hnWL")

		// remove field
		collection.Fields.RemoveById("_clone_qBRc")

		// remove field
		collection.Fields.RemoveById("_clone_b4Hj")

		// remove field
		collection.Fields.RemoveById("_clone_CPUq")

		// remove field
		collection.Fields.RemoveById("_clone_7ObM")

		// remove field
		collection.Fields.RemoveById("_clone_HKHT")

		// remove field
		collection.Fields.RemoveById("_clone_Bww5")

		// remove field
		collection.Fields.RemoveById("_clone_ljg2")

		// remove field
		collection.Fields.RemoveById("_clone_5wud")

		// remove field
		collection.Fields.RemoveById("_clone_xxrO")

		return app.Save(collection)
	})
}
