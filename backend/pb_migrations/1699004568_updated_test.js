/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e89miratosy476w")

  collection.options = {
    "query": "SELECT saft.id as id,  (saft.name || ' ' || users.name) as name1, saft.name from saft LEFT JOIN users on saft.user = users.id \n"
  }

  // remove
  collection.schema.removeField("ux2xgchz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4v68itl4",
    "name": "name1",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ts6nzyjt",
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
    "query": "SELECT saft.id as id,  (saft.name || ' ' || users.name) as name from saft LEFT JOIN users on saft.user = users.id \n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ux2xgchz",
    "name": "name",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("4v68itl4")

  // remove
  collection.schema.removeField("ts6nzyjt")

  return dao.saveCollection(collection)
})
