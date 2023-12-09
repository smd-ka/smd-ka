/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e89miratosy476w")

  collection.options = {
    "query": "SELECT saft.id as id,  (users.name || saft.name) as name1, saft.name from saft LEFT JOIN users on saft.user = users.id \n"
  }

  // remove
  collection.schema.removeField("w1kssugb")

  // remove
  collection.schema.removeField("kxywpgbh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cgfju3vb",
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
    "id": "4kg6k6ri",
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
    "query": "SELECT saft.id as id,  (saft.name || users.name) as name1, saft.name from saft LEFT JOIN users on saft.user = users.id \n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w1kssugb",
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
    "id": "kxywpgbh",
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
  collection.schema.removeField("cgfju3vb")

  // remove
  collection.schema.removeField("4kg6k6ri")

  return dao.saveCollection(collection)
})
