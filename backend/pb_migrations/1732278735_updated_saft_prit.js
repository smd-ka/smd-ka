/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f23hb17yd2jbvoz")

  collection.listRule = "@request.auth.roles.id ?~ 'pritresponsable'"
  collection.viewRule = ""

  // remove
  collection.schema.removeField("6prp03o5")

  // remove
  collection.schema.removeField("3zeneq3s")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "irdzpizb",
    "name": "name",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "okwejmdh",
    "name": "post_images",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "yes",
        "no_instagram",
        "no_website",
        "never"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f23hb17yd2jbvoz")

  collection.listRule = null
  collection.viewRule = null

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6prp03o5",
    "name": "name",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3zeneq3s",
    "name": "post_images",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "yes",
        "no_instagram",
        "no_website",
        "never"
      ]
    }
  }))

  // remove
  collection.schema.removeField("irdzpizb")

  // remove
  collection.schema.removeField("okwejmdh")

  return dao.saveCollection(collection)
})
