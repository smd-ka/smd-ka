/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skzm3nv3gicpo9z")

  collection.options = {
    "query": "SELECT saft.id as id, COALESCE((users.name || ' ' || users.surname), saft.name)\nas name, COALESCE(saft.email, users.email) as email , (saft.allergies || users.allergies) as allergies, saft.brings_cake, saft.is_vegetarian from saft LEFT JOIN users on saft.user = users.id ORDER BY name \n"
  }

  // remove
  collection.schema.removeField("qxtoyd1f")

  // remove
  collection.schema.removeField("v7nlcqcw")

  // remove
  collection.schema.removeField("tsw9d1g7")

  // remove
  collection.schema.removeField("rlafr9lh")

  // remove
  collection.schema.removeField("oinnkduy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r80gkixo",
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
    "id": "931cctue",
    "name": "email",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nlaytfv5",
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
    "id": "whntrwx6",
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
    "id": "r5tmogkd",
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
    "query": "SELECT saft.id as id, COALESCE((users.name || ' ' || users.surname), saft.name)\nas name, IFNULL(saft.email, users.email) as email , (saft.allergies || users.allergies) as allergies, saft.brings_cake, saft.is_vegetarian from saft LEFT JOIN users on saft.user = users.id ORDER BY name \n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qxtoyd1f",
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
    "id": "v7nlcqcw",
    "name": "email",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tsw9d1g7",
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
    "id": "rlafr9lh",
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
    "id": "oinnkduy",
    "name": "is_vegetarian",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("r80gkixo")

  // remove
  collection.schema.removeField("931cctue")

  // remove
  collection.schema.removeField("nlaytfv5")

  // remove
  collection.schema.removeField("whntrwx6")

  // remove
  collection.schema.removeField("r5tmogkd")

  return dao.saveCollection(collection)
})
