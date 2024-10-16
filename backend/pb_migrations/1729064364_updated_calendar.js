/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vcqdyzm1pq5e01u")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vo6oksoz",
    "name": "speaker",
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
  const collection = dao.findCollectionByNameOrId("vcqdyzm1pq5e01u")

  // remove
  collection.schema.removeField("vo6oksoz")

  return dao.saveCollection(collection)
})
