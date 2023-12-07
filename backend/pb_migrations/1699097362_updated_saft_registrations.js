/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skzm3nv3gicpo9z")

  collection.options = {
    "query": "SELECT saft.id as id, COALESCE((users.name || ' ' || users.surname), saft.name)\nas name, COALESCE(saft.allergies, users.allergies) as allergies, saft.brings_cake, saft.is_vegetarian from saft LEFT JOIN users on saft.user = users.id ORDER BY name \n"
  }

  // remove
  collection.schema.removeField("tqvd3ghg")

  // remove
  collection.schema.removeField("wa6binrb")

  // remove
  collection.schema.removeField("si4pd1rl")

  // remove
  collection.schema.removeField("jfzblqp0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "amirk3bm",
    "name": "name",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "36e7tyzk",
    "name": "allergies",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rmimzqwu",
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
    "id": "agt9riqg",
    "name": "is_vegetarian",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skzm3nv3gicpo9z")

  collection.options = {
    "query": "SELECT saft.id as id, COALESCE((users.name || ' ' || users.surname), saft.name)\nas name, COALESCE(users.allergies, saft.allergies) as allergies, saft.brings_cake, saft.is_vegetarian from saft LEFT JOIN users on saft.user = users.id ORDER BY name \n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tqvd3ghg",
    "name": "name",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wa6binrb",
    "name": "allergies",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "si4pd1rl",
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
    "id": "jfzblqp0",
    "name": "is_vegetarian",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("amirk3bm")

  // remove
  collection.schema.removeField("36e7tyzk")

  // remove
  collection.schema.removeField("rmimzqwu")

  // remove
  collection.schema.removeField("agt9riqg")

  return dao.saveCollection(collection)
})
