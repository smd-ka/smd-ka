/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skzm3nv3gicpo9z")

  collection.options = {
    "query": "SELECT \n  saft.id as id,\n  CAST(COALESCE((users.name || ' ' || users.surname), saft.name) AS TEXT) as name,\n  CAST((users.email || saft.email) AS TEXT) as email,\n  CAST((saft.allergies || users.allergies) AS TEXT) as allergies, saft.brings_cake, saft.is_vegetarian from saft LEFT JOIN users on saft.user = users.id ORDER BY name \n\n"
  }

  // remove
  collection.schema.removeField("uqaz5azp")

  // remove
  collection.schema.removeField("baqwhomy")

  // remove
  collection.schema.removeField("iadydmtf")

  // remove
  collection.schema.removeField("xv7e4avz")

  // remove
  collection.schema.removeField("3bl4adt2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yfi4xhk5",
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
    "id": "gtztxqre",
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
    "id": "tfybiyra",
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
    "id": "oef2oyg4",
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
    "id": "8akqtum0",
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
    "query": "SELECT \n  saft.id as id,\n  CAST(COALESCE((users.name || ' ' || users.surname), saft.name) AS TEXT) as name,\n  CAST(COALESCE(users.email, saft.email) AS TEXT) as email,\n  CAST((saft.allergies || users.allergies) AS TEXT) as allergies, saft.brings_cake, saft.is_vegetarian from saft LEFT JOIN users on saft.user = users.id ORDER BY name \n\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uqaz5azp",
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
    "id": "baqwhomy",
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
    "id": "iadydmtf",
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
    "id": "xv7e4avz",
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
    "id": "3bl4adt2",
    "name": "is_vegetarian",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("yfi4xhk5")

  // remove
  collection.schema.removeField("gtztxqre")

  // remove
  collection.schema.removeField("tfybiyra")

  // remove
  collection.schema.removeField("oef2oyg4")

  // remove
  collection.schema.removeField("8akqtum0")

  return dao.saveCollection(collection)
})
