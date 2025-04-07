/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vcqdyzm1pq5e01u")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nf40y9gd",
    "name": "category",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "erstsemesteraktion",
        "kingscafe",
        "smd_abend",
        "MIT"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vcqdyzm1pq5e01u")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nf40y9gd",
    "name": "category",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "erstsemesteraktion",
        "kingscafe",
        "smd_abend"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
