/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n1hxi9hjc6unlj0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9pukjalb",
    "name": "lodging_female",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ycrr6qmu",
    "name": "lodging_male",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z2okr9om",
    "name": "lodging_both",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n1hxi9hjc6unlj0")

  // remove
  collection.schema.removeField("9pukjalb")

  // remove
  collection.schema.removeField("ycrr6qmu")

  // remove
  collection.schema.removeField("z2okr9om")

  return dao.saveCollection(collection)
})
