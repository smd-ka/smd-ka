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
			"viewQuery": "SELECT \n  saft.created,\n  saft.id as id,\n  saft.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), \n  (saft.name || ' ' || saft.surname)) AS TEXT) as name,\n  CAST(COALESCE(users.email, saft.email) AS TEXT) as email,\n  CAST(COALESCE(users.gender, saft.gender) AS TEXT) as gender,\n  CAST(COALESCE(users.phonenumber, saft.phonenumber) AS TEXT) as phonenumber,\n  saft.travel_option, saft.travel_comments, saft.[group],\n  saft.ticket, saft.brings_cake,\n  CAST(COALESCE(users.vegetarian, saft.is_vegetarian) AS BOOL) as is_vegetarian,\n  CAST(COALESCE(users.allergies, saft.allergies) AS TEXT) as allergies, \n  saft.would_sleep_on_floor, saft.semester, saft.comments, saft.post_images,\n  saft.pot, saft.bag, saft.bag_count, saft.pad, saft.pad_count, saft.tents, saft.comes_friday\n  from saft LEFT JOIN users on saft.user = users.id WHERE semester='WS25/26' ORDER BY name \n\n"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_NaLY")

		// remove field
		collection.Fields.RemoveById("_clone_SkVd")

		// remove field
		collection.Fields.RemoveById("_clone_uFf6")

		// remove field
		collection.Fields.RemoveById("_clone_hyQn")

		// remove field
		collection.Fields.RemoveById("_clone_5SEr")

		// remove field
		collection.Fields.RemoveById("_clone_Qeg8")

		// remove field
		collection.Fields.RemoveById("_clone_txn6")

		// remove field
		collection.Fields.RemoveById("_clone_27SU")

		// remove field
		collection.Fields.RemoveById("_clone_f7nN")

		// remove field
		collection.Fields.RemoveById("_clone_51W2")

		// remove field
		collection.Fields.RemoveById("_clone_t1Kr")

		// remove field
		collection.Fields.RemoveById("_clone_7879")

		// remove field
		collection.Fields.RemoveById("_clone_8hoc")

		// remove field
		collection.Fields.RemoveById("_clone_ccGR")

		// remove field
		collection.Fields.RemoveById("_clone_vZfA")

		// remove field
		collection.Fields.RemoveById("_clone_0LPi")

		// remove field
		collection.Fields.RemoveById("_clone_oLjR")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(0, []byte(`{
			"hidden": false,
			"id": "_clone_Odez",
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
			"id": "_clone_Z7DL",
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
			"id": "_clone_wIG8",
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
			"id": "_clone_VsKJ",
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
			"id": "_clone_Ria7",
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
			"id": "_clone_qOyV",
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
			"id": "_clone_tgpv",
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
			"id": "_clone_mFC6",
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
			"id": "_clone_RmMK",
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
			"id": "_clone_4N0D",
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
			"id": "_clone_liDS",
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
		if err := collection.Fields.AddMarshaledJSONAt(18, []byte(`{
			"hidden": false,
			"id": "_clone_hkON",
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
			"id": "_clone_2FZt",
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
			"id": "_clone_sKVA",
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
			"id": "_clone_Jb1f",
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
			"id": "_clone_KbMQ",
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
			"id": "_clone_3M6j",
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
			"id": "_clone_4cjj",
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
			"viewQuery": "SELECT \n  saft.id as id, saft.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), \n  (saft.name || ' ' || saft.surname)) AS TEXT) as name,\n  CAST(COALESCE(users.email, saft.email) AS TEXT) as email,\n  CAST(COALESCE(users.gender, saft.gender) AS TEXT) as gender,\n  CAST(COALESCE(users.phonenumber, saft.phonenumber) AS TEXT) as phonenumber,\n  saft.travel_option, saft.travel_comments, saft.[group],\n  saft.ticket, saft.brings_cake,\n  CAST(COALESCE(users.vegetarian, saft.is_vegetarian) AS BOOL) as is_vegetarian,\n  CAST(COALESCE(users.allergies, saft.allergies) AS TEXT) as allergies, \n  saft.would_sleep_on_floor, saft.semester, saft.comments, saft.post_images,\n  saft.pot, saft.bag, saft.bag_count, saft.pad, saft.pad_count, saft.tents, saft.comes_friday\n  from saft LEFT JOIN users on saft.user = users.id WHERE semester='WS25/26' ORDER BY name \n\n"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "_clone_NaLY",
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
			"id": "_clone_SkVd",
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
			"id": "_clone_uFf6",
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
			"id": "_clone_hyQn",
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
			"id": "_clone_5SEr",
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
			"id": "_clone_Qeg8",
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
			"id": "_clone_txn6",
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
			"id": "_clone_27SU",
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
			"id": "_clone_f7nN",
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
			"id": "_clone_51W2",
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
			"id": "_clone_t1Kr",
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
			"id": "_clone_7879",
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
			"id": "_clone_8hoc",
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
			"id": "_clone_ccGR",
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
			"id": "_clone_vZfA",
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
			"id": "_clone_0LPi",
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
			"id": "_clone_oLjR",
			"name": "comes_friday",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "bool"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_Odez")

		// remove field
		collection.Fields.RemoveById("_clone_Z7DL")

		// remove field
		collection.Fields.RemoveById("_clone_wIG8")

		// remove field
		collection.Fields.RemoveById("_clone_VsKJ")

		// remove field
		collection.Fields.RemoveById("_clone_Ria7")

		// remove field
		collection.Fields.RemoveById("_clone_qOyV")

		// remove field
		collection.Fields.RemoveById("_clone_tgpv")

		// remove field
		collection.Fields.RemoveById("_clone_mFC6")

		// remove field
		collection.Fields.RemoveById("_clone_RmMK")

		// remove field
		collection.Fields.RemoveById("_clone_4N0D")

		// remove field
		collection.Fields.RemoveById("_clone_liDS")

		// remove field
		collection.Fields.RemoveById("_clone_hkON")

		// remove field
		collection.Fields.RemoveById("_clone_2FZt")

		// remove field
		collection.Fields.RemoveById("_clone_sKVA")

		// remove field
		collection.Fields.RemoveById("_clone_Jb1f")

		// remove field
		collection.Fields.RemoveById("_clone_KbMQ")

		// remove field
		collection.Fields.RemoveById("_clone_3M6j")

		// remove field
		collection.Fields.RemoveById("_clone_4cjj")

		return app.Save(collection)
	})
}
