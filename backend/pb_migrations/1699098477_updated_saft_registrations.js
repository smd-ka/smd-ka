/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skzm3nv3gicpo9z")

  collection.options = {
    "query": "SELECT saft.id as id, COALESCE((users.name || ' ' || users.surname), saft.name)\nas name, IFNULL(saft.email, users.email) as email , (saft.allergies || users.allergies) as allergies, saft.brings_cake, saft.is_vegetarian from saft LEFT JOIN users on saft.user = users.id ORDER BY name \n"
  }

  // remove
  collection.schema.removeField("zkz3ex7l")

  // remove
  collection.schema.removeField("ow6jafa2")

  // remove
  collection.schema.removeField("mz0ixulj")

  // remove
  collection.schema.removeField("fv7nobul")

  // remove
  collection.schema.removeField("qqmiils5")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skzm3nv3gicpo9z")

  collection.options = {
    "query": "SELECT saft.id as id, COALESCE((users.name || ' ' || users.surname), saft.name)\nas name, COALESCE(users.email, saft.email) as email , (saft.allergies || users.allergies) as allergies, saft.brings_cake, saft.is_vegetarian from saft LEFT JOIN users on saft.user = users.id ORDER BY name \n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zkz3ex7l",
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
    "id": "ow6jafa2",
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
    "id": "mz0ixulj",
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
    "id": "fv7nobul",
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
    "id": "qqmiils5",
    "name": "is_vegetarian",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

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

  return dao.saveCollection(collection)
})
