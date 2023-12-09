/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e89miratosy476w")

  collection.options = {
    "query": "SELECT saft.id as id, COALESCE(users.name, saft.name) as name, saft.allergies from saft LEFT JOIN users on saft.user = users.id ORDER BY saft.allergies DESC\n"
  }

  // remove
  collection.schema.removeField("q9tcmqp0")

  // remove
  collection.schema.removeField("atnfl8jx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "njpo36n2",
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
    "id": "yylvzcqd",
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
  const collection = dao.findCollectionByNameOrId("e89miratosy476w")

  collection.options = {
    "query": "SELECT saft.id as id, COALESCE(users.name, saft.name) as name, saft.allergies from saft LEFT JOIN users on saft.user = users.id \n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q9tcmqp0",
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
    "id": "atnfl8jx",
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
  collection.schema.removeField("njpo36n2")

  // remove
  collection.schema.removeField("yylvzcqd")

  return dao.saveCollection(collection)
})
