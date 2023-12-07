/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e89miratosy476w")

  collection.options = {
    "query": "SELECT saft.id as id, COALESCE(saft.name, users.name) as name1, saft.name from saft LEFT JOIN users on saft.user = users.id \n"
  }

  // remove
  collection.schema.removeField("mromunhx")

  // remove
  collection.schema.removeField("tknfbwcs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z7vxbiq6",
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
    "id": "atianb1j",
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
    "query": "SELECT saft.id as id,  (users.name || (saft.name || '')) as name1, saft.name from saft LEFT JOIN users on saft.user = users.id \n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mromunhx",
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
    "id": "tknfbwcs",
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
  collection.schema.removeField("z7vxbiq6")

  // remove
  collection.schema.removeField("atianb1j")

  return dao.saveCollection(collection)
})
