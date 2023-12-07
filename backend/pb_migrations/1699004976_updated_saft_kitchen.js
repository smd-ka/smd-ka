/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("05r3ecdi62xhor1")

  collection.options = {
    "query": "SELECT saft.id as id, COALESCE(users.name, saft.name) as name, saft.allergies from saft LEFT JOIN users on saft.user = users.id ORDER BY saft.allergies DESC\n"
  }

  // remove
  collection.schema.removeField("gnaf22eu")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("05r3ecdi62xhor1")

  collection.options = {
    "query": "SELECT id, allergies from saft"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gnaf22eu",
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
  collection.schema.removeField("teysmlxe")

  // remove
  collection.schema.removeField("aixe3fvj")

  return dao.saveCollection(collection)
})
