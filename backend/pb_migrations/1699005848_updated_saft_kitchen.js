/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("05r3ecdi62xhor1")

  collection.options = {
    "query": "SELECT saft.id as id, COALESCE(users.name, saft.name) as name, saft.allergies, saft.brings_cake, saft.is_vegetarian from saft LEFT JOIN users on saft.user = users.id ORDER BY saft.allergies DESC\n"
  }

  // remove
  collection.schema.removeField("teysmlxe")

  // remove
  collection.schema.removeField("aixe3fvj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cgidsxj5",
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
    "id": "025uydci",
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
    "id": "3xletkmw",
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
    "id": "qjtzestx",
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
  const collection = dao.findCollectionByNameOrId("05r3ecdi62xhor1")

  collection.options = {
    "query": "SELECT saft.id as id, COALESCE(users.name, saft.name) as name, saft.allergies from saft LEFT JOIN users on saft.user = users.id ORDER BY saft.allergies DESC\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "teysmlxe",
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
    "id": "aixe3fvj",
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

  // remove
  collection.schema.removeField("cgidsxj5")

  // remove
  collection.schema.removeField("025uydci")

  // remove
  collection.schema.removeField("3xletkmw")

  // remove
  collection.schema.removeField("qjtzestx")

  return dao.saveCollection(collection)
})
