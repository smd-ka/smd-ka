/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skzm3nv3gicpo9z")

  collection.options = {
    "query": "SELECT \n  saft.id as id, saft.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), \n  (saft.name || ' ' || saft.surname)) AS TEXT) as name,\n  CAST(COALESCE(users.email, saft.email) AS TEXT) as email,\n  CAST(COALESCE(users.phonenumber, saft.phonenumber) AS TEXT) as phonenumber,\n  saft.travel_option, saft.travel_comments,\n  saft.ticket, saft.brings_cake, saft.is_vegetarian,\n  CAST((users.allergies || saft.allergies) AS TEXT) as allergies, \n  saft.would_sleep_on_floor, saft.semester, saft.comments, saft.post_images\n  from saft LEFT JOIN users on saft.user = users.id WHERE semester='WS24/25' ORDER BY name \n\n"
  }

  // remove
  collection.schema.removeField("eeiydfvm")

  // remove
  collection.schema.removeField("o0whpwsr")

  // remove
  collection.schema.removeField("lbuvvp8t")

  // remove
  collection.schema.removeField("gp6oodoe")

  // remove
  collection.schema.removeField("5n642j6w")

  // remove
  collection.schema.removeField("tbiqa840")

  // remove
  collection.schema.removeField("iwnsrnnm")

  // remove
  collection.schema.removeField("rti3bere")

  // remove
  collection.schema.removeField("fg19hnbo")

  // remove
  collection.schema.removeField("bmgmeh9l")

  // remove
  collection.schema.removeField("dkbkbgir")

  // remove
  collection.schema.removeField("ayl3xteu")

  // remove
  collection.schema.removeField("hr3oywmh")

  // remove
  collection.schema.removeField("z6atplae")

  // remove
  collection.schema.removeField("czi4sl15")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xsmgok6e",
    "name": "paid",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hglckfqw",
    "name": "name",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mxduhrxh",
    "name": "email",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w7fvzhsl",
    "name": "phonenumber",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2xxktghk",
    "name": "travel_option",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "takesBike",
        "takesTrain",
        "takesCar",
        "takesOwn",
        "takesGroup"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g4ec9iaf",
    "name": "travel_comments",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8vqzzvcb",
    "name": "ticket",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wyemigcp",
    "name": "brings_cake",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kzlvbf19",
    "name": "is_vegetarian",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "psoeybsn",
    "name": "allergies",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "onwg4pxq",
    "name": "would_sleep_on_floor",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8xnqkuvx",
    "name": "semester",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "esljcucg",
    "name": "comments",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "187ihpea",
    "name": "post_images",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "yes",
        "no_instagram",
        "no_website",
        "never"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skzm3nv3gicpo9z")

  collection.options = {
    "query": "SELECT \n  saft.id as id, saft.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), saft.name) AS TEXT) as name,\n  CAST(COALESCE(users.email, saft.email) AS TEXT) as email,\n  CAST(COALESCE(users.phonenumber, saft.phonenumber) AS TEXT) as phonenumber,\n  saft.takes_bike, saft.takes_train, saft.takes_car,\n  saft.ticket, saft.brings_cake, saft.is_vegetarian,\n  CAST((users.allergies || saft.allergies) AS TEXT) as allergies, \n  saft.would_sleep_on_floor, saft.semester, saft.comments, saft.post_images\n  from saft LEFT JOIN users on saft.user = users.id WHERE semester='WS24/25' ORDER BY name \n\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eeiydfvm",
    "name": "paid",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o0whpwsr",
    "name": "name",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lbuvvp8t",
    "name": "email",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gp6oodoe",
    "name": "phonenumber",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5n642j6w",
    "name": "takes_bike",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tbiqa840",
    "name": "takes_train",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iwnsrnnm",
    "name": "takes_car",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rti3bere",
    "name": "ticket",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fg19hnbo",
    "name": "brings_cake",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bmgmeh9l",
    "name": "is_vegetarian",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dkbkbgir",
    "name": "allergies",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ayl3xteu",
    "name": "would_sleep_on_floor",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hr3oywmh",
    "name": "semester",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z6atplae",
    "name": "comments",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "czi4sl15",
    "name": "post_images",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "yes",
        "no_instagram",
        "no_website",
        "never"
      ]
    }
  }))

  // remove
  collection.schema.removeField("xsmgok6e")

  // remove
  collection.schema.removeField("hglckfqw")

  // remove
  collection.schema.removeField("mxduhrxh")

  // remove
  collection.schema.removeField("w7fvzhsl")

  // remove
  collection.schema.removeField("2xxktghk")

  // remove
  collection.schema.removeField("g4ec9iaf")

  // remove
  collection.schema.removeField("8vqzzvcb")

  // remove
  collection.schema.removeField("wyemigcp")

  // remove
  collection.schema.removeField("kzlvbf19")

  // remove
  collection.schema.removeField("psoeybsn")

  // remove
  collection.schema.removeField("onwg4pxq")

  // remove
  collection.schema.removeField("8xnqkuvx")

  // remove
  collection.schema.removeField("esljcucg")

  // remove
  collection.schema.removeField("187ihpea")

  return dao.saveCollection(collection)
})
