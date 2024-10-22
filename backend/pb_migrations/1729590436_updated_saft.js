/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vjp3hff1xatw8k8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vinyg6ue",
    "name": "travel_comments",
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
  const collection = dao.findCollectionByNameOrId("vjp3hff1xatw8k8")

  // remove
  collection.schema.removeField("vinyg6ue")

  return dao.saveCollection(collection)
})
