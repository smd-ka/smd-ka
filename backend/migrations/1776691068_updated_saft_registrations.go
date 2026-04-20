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
			"viewQuery": "SELECT \n  saft.created,\n  saft.id as id,\n  saft.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), \n  (saft.name || ' ' || saft.surname)) AS TEXT) as name,\n  CAST(COALESCE(users.email, saft.email) AS TEXT) as email,\n  CAST(COALESCE(users.gender, saft.gender) AS TEXT) as gender,\n  CAST(COALESCE(users.phonenumber, saft.phonenumber) AS TEXT) as phonenumber,\n  saft.travel_option, saft.travel_comments, saft.[group],\n  saft.ticket, saft.brings_cake,\n  CAST(COALESCE(users.vegetarian, saft.is_vegetarian) AS BOOL) as is_vegetarian,\n  CAST(COALESCE(users.allergies, saft.allergies) AS TEXT) as allergies, \n  saft.would_sleep_on_floor, saft.semester, saft.comments, saft.post_images,\n  saft.pot, saft.bag, saft.bag_count, saft.pad, saft.pad_count, saft.tents, saft.comes_friday, saft.side_dish, saft.fairy_lights, saft.likes_cooking\n  from saft LEFT JOIN users on saft.user = users.id WHERE semester='SS26' ORDER BY name \n\n"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_zcVE")

		// remove field
		collection.Fields.RemoveById("_clone_T6qp")

		// remove field
		collection.Fields.RemoveById("_clone_KNIS")

		// remove field
		collection.Fields.RemoveById("_clone_3ew0")

		// remove field
		collection.Fields.RemoveById("_clone_B5Sw")

		// remove field
		collection.Fields.RemoveById("_clone_FTFV")

		// remove field
		collection.Fields.RemoveById("_clone_3AoX")

		// remove field
		collection.Fields.RemoveById("_clone_4W96")

		// remove field
		collection.Fields.RemoveById("_clone_0QUO")

		// remove field
		collection.Fields.RemoveById("_clone_kgOy")

		// remove field
		collection.Fields.RemoveById("_clone_IDDv")

		// remove field
		collection.Fields.RemoveById("_clone_cLX3")

		// remove field
		collection.Fields.RemoveById("_clone_feBt")

		// remove field
		collection.Fields.RemoveById("_clone_ncd9")

		// remove field
		collection.Fields.RemoveById("_clone_G3sr")

		// remove field
		collection.Fields.RemoveById("_clone_I0tr")

		// remove field
		collection.Fields.RemoveById("_clone_aXkm")

		// remove field
		collection.Fields.RemoveById("_clone_GhM8")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(0, []byte(`{
			"hidden": false,
			"id": "_clone_17g6",
			"name": "created",
			"onCreate": true,
			"onUpdate": false,
			"presentable": false,
			"system": false,
			"type": "autodate"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "_clone_ZBKo",
			"name": "paid",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "_clone_wouS",
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
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_dD2Z",
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
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"hidden": false,
			"id": "_clone_BI3d",
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
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_uFCd",
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
		if err := collection.Fields.AddMarshaledJSONAt(11, []byte(`{
			"hidden": false,
			"id": "_clone_scnD",
			"name": "brings_cake",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(14, []byte(`{
			"hidden": false,
			"id": "_clone_1Pce",
			"name": "would_sleep_on_floor",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(15, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_ocgj",
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
		if err := collection.Fields.AddMarshaledJSONAt(16, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_gnot",
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
		if err := collection.Fields.AddMarshaledJSONAt(17, []byte(`{
			"hidden": false,
			"id": "_clone_DJcR",
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
				"no"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(18, []byte(`{
			"hidden": false,
			"id": "_clone_k4He",
			"name": "pot",
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
			"id": "_clone_ybga",
			"name": "bag",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(20, []byte(`{
			"hidden": false,
			"id": "_clone_ZxQe",
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
		if err := collection.Fields.AddMarshaledJSONAt(21, []byte(`{
			"hidden": false,
			"id": "_clone_3xFX",
			"name": "pad",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(22, []byte(`{
			"hidden": false,
			"id": "_clone_JDXk",
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
		if err := collection.Fields.AddMarshaledJSONAt(23, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_ZP7M",
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
		if err := collection.Fields.AddMarshaledJSONAt(24, []byte(`{
			"hidden": false,
			"id": "_clone_iQd0",
			"name": "comes_friday",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(25, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_RXhT",
			"max": 0,
			"min": 0,
			"name": "side_dish",
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
		if err := collection.Fields.AddMarshaledJSONAt(26, []byte(`{
			"hidden": false,
			"id": "_clone_ggiv",
			"name": "fairy_lights",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(27, []byte(`{
			"hidden": false,
			"id": "_clone_O0xL",
			"max": 5,
			"min": 1,
			"name": "likes_cooking",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
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
			"viewQuery": "SELECT \n  saft.created,\n  saft.id as id,\n  saft.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), \n  (saft.name || ' ' || saft.surname)) AS TEXT) as name,\n  CAST(COALESCE(users.email, saft.email) AS TEXT) as email,\n  CAST(COALESCE(users.gender, saft.gender) AS TEXT) as gender,\n  CAST(COALESCE(users.phonenumber, saft.phonenumber) AS TEXT) as phonenumber,\n  saft.travel_option, saft.travel_comments, saft.[group],\n  saft.ticket, saft.brings_cake,\n  CAST(COALESCE(users.vegetarian, saft.is_vegetarian) AS BOOL) as is_vegetarian,\n  CAST(COALESCE(users.allergies, saft.allergies) AS TEXT) as allergies, \n  saft.would_sleep_on_floor, saft.semester, saft.comments, saft.post_images,\n  saft.pot, saft.bag, saft.bag_count, saft.pad, saft.pad_count, saft.tents, saft.comes_friday\n  from saft LEFT JOIN users on saft.user = users.id WHERE semester='SS26' ORDER BY name \n\n"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(0, []byte(`{
			"hidden": false,
			"id": "_clone_zcVE",
			"name": "created",
			"onCreate": true,
			"onUpdate": false,
			"presentable": false,
			"system": false,
			"type": "autodate"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "_clone_T6qp",
			"name": "paid",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "_clone_KNIS",
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
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_3ew0",
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
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"hidden": false,
			"id": "_clone_B5Sw",
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
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_FTFV",
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
		if err := collection.Fields.AddMarshaledJSONAt(11, []byte(`{
			"hidden": false,
			"id": "_clone_3AoX",
			"name": "brings_cake",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(14, []byte(`{
			"hidden": false,
			"id": "_clone_4W96",
			"name": "would_sleep_on_floor",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(15, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_0QUO",
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
		if err := collection.Fields.AddMarshaledJSONAt(16, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_kgOy",
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
		if err := collection.Fields.AddMarshaledJSONAt(17, []byte(`{
			"hidden": false,
			"id": "_clone_IDDv",
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
				"no"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(18, []byte(`{
			"hidden": false,
			"id": "_clone_cLX3",
			"name": "pot",
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
			"id": "_clone_feBt",
			"name": "bag",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(20, []byte(`{
			"hidden": false,
			"id": "_clone_ncd9",
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
		if err := collection.Fields.AddMarshaledJSONAt(21, []byte(`{
			"hidden": false,
			"id": "_clone_G3sr",
			"name": "pad",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(22, []byte(`{
			"hidden": false,
			"id": "_clone_I0tr",
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
		if err := collection.Fields.AddMarshaledJSONAt(23, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_aXkm",
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
		if err := collection.Fields.AddMarshaledJSONAt(24, []byte(`{
			"hidden": false,
			"id": "_clone_GhM8",
			"name": "comes_friday",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_17g6")

		// remove field
		collection.Fields.RemoveById("_clone_ZBKo")

		// remove field
		collection.Fields.RemoveById("_clone_wouS")

		// remove field
		collection.Fields.RemoveById("_clone_dD2Z")

		// remove field
		collection.Fields.RemoveById("_clone_BI3d")

		// remove field
		collection.Fields.RemoveById("_clone_uFCd")

		// remove field
		collection.Fields.RemoveById("_clone_scnD")

		// remove field
		collection.Fields.RemoveById("_clone_1Pce")

		// remove field
		collection.Fields.RemoveById("_clone_ocgj")

		// remove field
		collection.Fields.RemoveById("_clone_gnot")

		// remove field
		collection.Fields.RemoveById("_clone_DJcR")

		// remove field
		collection.Fields.RemoveById("_clone_k4He")

		// remove field
		collection.Fields.RemoveById("_clone_ybga")

		// remove field
		collection.Fields.RemoveById("_clone_ZxQe")

		// remove field
		collection.Fields.RemoveById("_clone_3xFX")

		// remove field
		collection.Fields.RemoveById("_clone_JDXk")

		// remove field
		collection.Fields.RemoveById("_clone_ZP7M")

		// remove field
		collection.Fields.RemoveById("_clone_iQd0")

		// remove field
		collection.Fields.RemoveById("_clone_RXhT")

		// remove field
		collection.Fields.RemoveById("_clone_ggiv")

		// remove field
		collection.Fields.RemoveById("_clone_O0xL")

		return app.Save(collection)
	})
}
