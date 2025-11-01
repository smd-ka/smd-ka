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
			"viewQuery": "SELECT \n  saft.id as id, saft.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), \n  (saft.name || ' ' || saft.surname)) AS TEXT) as name,\n  CAST(COALESCE(users.email, saft.email) AS TEXT) as email,\n  CAST(COALESCE(users.gender, saft.gender) AS TEXT) as gender,\n  CAST(COALESCE(users.phonenumber, saft.phonenumber) AS TEXT) as phonenumber,\n  saft.travel_option, saft.travel_comments, saft.[group],\n  saft.ticket, saft.brings_cake,\n  CAST(COALESCE(users.vegetarian, saft.is_vegetarian) AS BOOL) as is_vegetarian,\n  CAST(COALESCE(users.allergies, saft.allergies) AS TEXT) as allergies, \n  saft.would_sleep_on_floor, saft.semester, saft.comments, saft.post_images,\n  saft.pot, saft.bag, saft.bag_count, saft.pad, saft.pad_count, saft.tents, saft.comes_friday\n  from saft LEFT JOIN users on saft.user = users.id WHERE semester='WS25/26' ORDER BY name \n\n"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_Nrde")

		// remove field
		collection.Fields.RemoveById("_clone_8fmu")

		// remove field
		collection.Fields.RemoveById("_clone_TdLf")

		// remove field
		collection.Fields.RemoveById("_clone_Zudw")

		// remove field
		collection.Fields.RemoveById("_clone_x4a0")

		// remove field
		collection.Fields.RemoveById("_clone_xNxn")

		// remove field
		collection.Fields.RemoveById("_clone_i2aS")

		// remove field
		collection.Fields.RemoveById("_clone_F9V8")

		// remove field
		collection.Fields.RemoveById("_clone_iLbL")

		// remove field
		collection.Fields.RemoveById("_clone_0doB")

		// remove field
		collection.Fields.RemoveById("_clone_ramm")

		// remove field
		collection.Fields.RemoveById("_clone_1q90")

		// remove field
		collection.Fields.RemoveById("_clone_LXLE")

		// remove field
		collection.Fields.RemoveById("_clone_b3wJ")

		// remove field
		collection.Fields.RemoveById("_clone_nEfX")

		// remove field
		collection.Fields.RemoveById("_clone_Lxwi")

		// remove field
		collection.Fields.RemoveById("_clone_G1We")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "_clone_T8lf",
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
			"id": "_clone_Qjol",
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
			"id": "_clone_xXtV",
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
			"id": "_clone_lWjY",
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
			"id": "_clone_X1er",
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
			"id": "_clone_KDyn",
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
			"id": "_clone_1C1g",
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
			"id": "_clone_pYBS",
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
			"id": "_clone_HeH8",
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
			"id": "_clone_KJ1M",
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
			"id": "_clone_RVXg",
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
			"id": "_clone_1dyj",
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
			"id": "_clone_Q5JB",
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
			"id": "_clone_5dkE",
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
			"id": "_clone_br5x",
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
			"id": "_clone_nMGU",
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
			"id": "_clone_iTOU",
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
			"viewQuery": "SELECT \n  saft.id as id, saft.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), \n  (saft.name || ' ' || saft.surname)) AS TEXT) as name,\n  CAST(COALESCE(users.email, saft.email) AS TEXT) as email,\n  CAST(COALESCE(users.gender, saft.gender) AS TEXT) as gender,\n  CAST(COALESCE(users.phonenumber, saft.phonenumber) AS TEXT) as phonenumber,\n  saft.travel_option, saft.travel_comments, saft.[group],\n  saft.ticket, saft.brings_cake,\n  CAST(COALESCE(users.vegetarian, saft.is_vegetarian) AS BOOL) as is_vegetarian,\n  CAST(COALESCE(users.allergies, saft.allergies) AS TEXT) as allergies, \n  saft.would_sleep_on_floor, saft.semester, saft.comments, saft.post_images,\n  saft.pot, saft.bag, saft.bag_count, saft.pad, saft.pad_count, saft.tents, saft.comes_friday\n  from saft LEFT JOIN users on saft.user = users.id WHERE semester='SS25' ORDER BY name \n\n"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "_clone_Nrde",
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
			"id": "_clone_8fmu",
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
			"id": "_clone_TdLf",
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
			"id": "_clone_Zudw",
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
			"id": "_clone_x4a0",
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
			"id": "_clone_xNxn",
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
			"id": "_clone_i2aS",
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
			"id": "_clone_F9V8",
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
			"id": "_clone_iLbL",
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
			"id": "_clone_0doB",
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
			"id": "_clone_ramm",
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
			"id": "_clone_1q90",
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
			"id": "_clone_LXLE",
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
			"id": "_clone_b3wJ",
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
			"id": "_clone_nEfX",
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
			"id": "_clone_Lxwi",
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
			"id": "_clone_G1We",
			"name": "comes_friday",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_T8lf")

		// remove field
		collection.Fields.RemoveById("_clone_Qjol")

		// remove field
		collection.Fields.RemoveById("_clone_xXtV")

		// remove field
		collection.Fields.RemoveById("_clone_lWjY")

		// remove field
		collection.Fields.RemoveById("_clone_X1er")

		// remove field
		collection.Fields.RemoveById("_clone_KDyn")

		// remove field
		collection.Fields.RemoveById("_clone_1C1g")

		// remove field
		collection.Fields.RemoveById("_clone_pYBS")

		// remove field
		collection.Fields.RemoveById("_clone_HeH8")

		// remove field
		collection.Fields.RemoveById("_clone_KJ1M")

		// remove field
		collection.Fields.RemoveById("_clone_RVXg")

		// remove field
		collection.Fields.RemoveById("_clone_1dyj")

		// remove field
		collection.Fields.RemoveById("_clone_Q5JB")

		// remove field
		collection.Fields.RemoveById("_clone_5dkE")

		// remove field
		collection.Fields.RemoveById("_clone_br5x")

		// remove field
		collection.Fields.RemoveById("_clone_nMGU")

		// remove field
		collection.Fields.RemoveById("_clone_iTOU")

		return app.Save(collection)
	})
}
