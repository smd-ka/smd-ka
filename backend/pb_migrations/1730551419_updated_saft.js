/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vjp3hff1xatw8k8")

  // remove
  collection.schema.removeField("0y0jp5iy")

  // remove
  collection.schema.removeField("hlfjtnbh")

  // remove
  collection.schema.removeField("0kkps6um")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vjp3hff1xatw8k8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0y0jp5iy",
    "name": "takes_car",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hlfjtnbh",
    "name": "takes_bike",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0kkps6um",
    "name": "takes_train",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
