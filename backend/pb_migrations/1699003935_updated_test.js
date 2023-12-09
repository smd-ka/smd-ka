/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e89miratosy476w")

  collection.options = {
    "query": "SELECT saft.id, saft.name from saft JOIN users\n"
  }

  // remove
  collection.schema.removeField("sdsbwq1q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k6agdham",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e89miratosy476w")

  collection.options = {
    "query": "SELECT saft.id, saft.name from saft LEFT JOIN users GROUP BY saft.user\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sdsbwq1q",
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

  // remove
  collection.schema.removeField("k6agdham")

  return dao.saveCollection(collection)
})
