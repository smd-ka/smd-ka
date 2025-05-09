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
			"viewQuery": "SELECT \n  saft.id as id, saft.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), \n  (saft.name || ' ' || saft.surname)) AS TEXT) as name,\n  CAST(COALESCE(users.email, saft.email) AS TEXT) as email,\n  CAST(COALESCE(users.gender, saft.gender) AS TEXT) as gender,\n  CAST(COALESCE(users.phonenumber, saft.phonenumber) AS TEXT) as phonenumber,\n  saft.travel_option, saft.travel_comments, saft.[group],\n  saft.ticket, saft.brings_cake,\n  CAST(COALESCE(users.vegetarian, saft.is_vegetarian) AS BOOL) as is_vegetarian,\n  CAST(COALESCE(users.allergies, saft.allergies) AS TEXT) as allergies, \n  saft.would_sleep_on_floor, saft.semester, saft.comments, saft.post_images\n  from saft LEFT JOIN users on saft.user = users.id WHERE semester='SS25' ORDER BY name \n\n"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_ZiIS")

		// remove field
		collection.Fields.RemoveById("_clone_MHQO")

		// remove field
		collection.Fields.RemoveById("_clone_Zhoz")

		// remove field
		collection.Fields.RemoveById("_clone_KoRJ")

		// remove field
		collection.Fields.RemoveById("_clone_5Wkr")

		// remove field
		collection.Fields.RemoveById("_clone_yxaP")

		// remove field
		collection.Fields.RemoveById("_clone_mCjz")

		// remove field
		collection.Fields.RemoveById("_clone_vzqc")

		// remove field
		collection.Fields.RemoveById("_clone_NWS4")

		// remove field
		collection.Fields.RemoveById("_clone_t07u")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "_clone_dXPe",
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
			"id": "_clone_q8G1",
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
			"id": "_clone_z9mi",
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
			"id": "_clone_NLsL",
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
			"id": "_clone_WYqg",
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
			"id": "_clone_Zdxc",
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
			"id": "_clone_GXDy",
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
			"id": "_clone_uHpI",
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
			"id": "_clone_5XeZ",
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
			"id": "_clone_TKqx",
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

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("skzm3nv3gicpo9z")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "SELECT \n  saft.id as id, saft.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), \n  (saft.name || ' ' || saft.surname)) AS TEXT) as name,\n  CAST(COALESCE(users.email, saft.email) AS TEXT) as email,\n  CAST(COALESCE(users.gender, saft.gender) AS TEXT) as gender,\n  CAST(COALESCE(users.phonenumber, saft.phonenumber) AS TEXT) as phonenumber,\n  saft.travel_option, saft.travel_comments, saft.[group],\n  saft.ticket, saft.brings_cake,\n  CAST(COALESCE(users.vegetarian, saft.is_vegetarian) AS BOOL) as is_vegetarian,\n  CAST(COALESCE(users.allergies, saft.allergies) AS TEXT) as allergies, \n  saft.would_sleep_on_floor, saft.semester, saft.comments, saft.post_images\n  from saft LEFT JOIN users on saft.user = users.id WHERE semester='WS24/25' ORDER BY name \n\n"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "_clone_ZiIS",
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
			"id": "_clone_MHQO",
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
			"id": "_clone_Zhoz",
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
			"id": "_clone_KoRJ",
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
			"id": "_clone_5Wkr",
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
			"id": "_clone_yxaP",
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
			"id": "_clone_mCjz",
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
			"id": "_clone_vzqc",
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
			"id": "_clone_NWS4",
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
			"id": "_clone_t07u",
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

		// remove field
		collection.Fields.RemoveById("_clone_dXPe")

		// remove field
		collection.Fields.RemoveById("_clone_q8G1")

		// remove field
		collection.Fields.RemoveById("_clone_z9mi")

		// remove field
		collection.Fields.RemoveById("_clone_NLsL")

		// remove field
		collection.Fields.RemoveById("_clone_WYqg")

		// remove field
		collection.Fields.RemoveById("_clone_Zdxc")

		// remove field
		collection.Fields.RemoveById("_clone_GXDy")

		// remove field
		collection.Fields.RemoveById("_clone_uHpI")

		// remove field
		collection.Fields.RemoveById("_clone_5XeZ")

		// remove field
		collection.Fields.RemoveById("_clone_TKqx")

		return app.Save(collection)
	})
}
