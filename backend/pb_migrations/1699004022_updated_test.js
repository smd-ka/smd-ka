/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e89miratosy476w")

  collection.options = {
    "query": "SELECT saft.id, saft.name from saft LEFT JOIN users on saft.user = users.id\n"
  }

  // remove
  collection.schema.removeField("rvneixmb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "niheugfh",
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
    "query": "SELECT saft.id, saft.name from saft JOIN users on saft.user = users.id\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rvneixmb",
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
  collection.schema.removeField("niheugfh")

  return dao.saveCollection(collection)
})
