/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skzm3nv3gicpo9z")

  collection.options = {
    "query": "SELECT \n  saft.id as id,\n  CAST(COALESCE((users.name || ' ' || users.surname), saft.name) AS TEXT) as name,\n  CAST(COALESCE(users.email, saft.email) AS TEXT) as email,\n  CAST(COALESCE(users.phonenumber, saft.phonenumber) AS TEXT) as phonenumber,\n  saft.takes_bike, saft.takes_train, saft.takes_car,\n  saft.ticket, saft.brings_cake, saft.is_vegetarian,\n  CAST(COALESCE(users.allergies, saft.allergies) AS TEXT) as allergies, \n  saft.would_sleep_on_floor, saft.comments\n  from saft LEFT JOIN users on saft.user = users.id ORDER BY name \n\n"
  }

  // remove
  collection.schema.removeField("gwdzgfe7")

  // remove
  collection.schema.removeField("lkxrbuc4")

  // remove
  collection.schema.removeField("o9m6w1u9")

  // remove
  collection.schema.removeField("o9lpxfia")

  // remove
  collection.schema.removeField("jwcje992")

  // remove
  collection.schema.removeField("szwhglyl")

  // remove
  collection.schema.removeField("hzp7dhx8")

  // remove
  collection.schema.removeField("yydmitew")

  // remove
  collection.schema.removeField("gufvsmoo")

  // remove
  collection.schema.removeField("mpqtsnxo")

  // remove
  collection.schema.removeField("rjhole3s")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y4xf7kkm",
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
    "id": "wwsk5pta",
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
    "id": "jyebx6jc",
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
    "id": "bwl43yb7",
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
    "id": "uckq4eub",
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
    "id": "apgiadu3",
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
    "id": "fxk0gjb9",
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
    "id": "q5mambpy",
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
    "id": "vqlf64xl",
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
    "id": "lkzx6c7o",
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
    "id": "vc0jdpe8",
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
    "id": "vbzrtnzr",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skzm3nv3gicpo9z")

  collection.options = {
    "query": "SELECT \n  saft.id as id,\n  CAST(COALESCE((users.name || ' ' || users.surname), saft.name) AS TEXT) as name,\n  CAST(COALESCE(users.email, saft.email) AS TEXT) as email,\n  CAST(COALESCE(users.phonenumber, saft.phonenumber) AS TEXT) as phonenumber,\n  saft.takes_bike, saft.takes_train, saft.takes_car,\n  saft.ticket, saft.brings_cake, saft.is_vegetarian,\n  CAST(COALESCE(users.allergies, saft.allergies) AS TEXT) as allergies, \n  saft.comments\n  from saft LEFT JOIN users on saft.user = users.id ORDER BY name \n\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gwdzgfe7",
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
    "id": "lkxrbuc4",
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
    "id": "o9m6w1u9",
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
    "id": "o9lpxfia",
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
    "id": "jwcje992",
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
    "id": "szwhglyl",
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
    "id": "hzp7dhx8",
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
    "id": "yydmitew",
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
    "id": "gufvsmoo",
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
    "id": "mpqtsnxo",
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
    "id": "rjhole3s",
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

  // remove
  collection.schema.removeField("y4xf7kkm")

  // remove
  collection.schema.removeField("wwsk5pta")

  // remove
  collection.schema.removeField("jyebx6jc")

  // remove
  collection.schema.removeField("bwl43yb7")

  // remove
  collection.schema.removeField("uckq4eub")

  // remove
  collection.schema.removeField("apgiadu3")

  // remove
  collection.schema.removeField("fxk0gjb9")

  // remove
  collection.schema.removeField("q5mambpy")

  // remove
  collection.schema.removeField("vqlf64xl")

  // remove
  collection.schema.removeField("lkzx6c7o")

  // remove
  collection.schema.removeField("vc0jdpe8")

  // remove
  collection.schema.removeField("vbzrtnzr")

  return dao.saveCollection(collection)
})
