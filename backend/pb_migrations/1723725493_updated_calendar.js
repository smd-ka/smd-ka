/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vcqdyzm1pq5e01u")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yqdplcgt",
    "name": "end_date_time",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tl0razw7",
    "name": "start_date_time",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vcqdyzm1pq5e01u")

  // remove
  collection.schema.removeField("yqdplcgt")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tl0razw7",
    "name": "date_time",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
