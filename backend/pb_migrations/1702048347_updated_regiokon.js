/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n1hxi9hjc6unlj0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "11n1sjfb",
    "name": "gender",
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
  const collection = dao.findCollectionByNameOrId("n1hxi9hjc6unlj0")

  // remove
  collection.schema.removeField("11n1sjfb")

  return dao.saveCollection(collection)
})
