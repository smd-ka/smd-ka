/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e89miratosy476w")

  collection.options = {
    "query": "SELECT saft.id, saft.name from saft LEFT JOIN users\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "utdqsphl",
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
    "query": "SELECT saft.id from saft LEFT JOIN users\n"
  }

  // remove
  collection.schema.removeField("utdqsphl")

  return dao.saveCollection(collection)
})
