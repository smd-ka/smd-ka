/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("44aun5nwvohgrw4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "btvc8p6b",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("44aun5nwvohgrw4")

  // remove
  collection.schema.removeField("btvc8p6b")

  return dao.saveCollection(collection)
})
