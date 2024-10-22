/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vjp3hff1xatw8k8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5weiepoo",
    "name": "surname",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mfmwx4mg",
    "name": "gender",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "male",
        "female"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5iebip25",
    "name": "group",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Karlsruhe",
        "Landau"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wmfj6nww",
    "name": "travel_option",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "takesBike",
        "takesTrain",
        "takesCar",
        "takesOwn",
        "takesGroup"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h8vtd4ny",
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
  const collection = dao.findCollectionByNameOrId("vjp3hff1xatw8k8")

  // remove
  collection.schema.removeField("5weiepoo")

  // remove
  collection.schema.removeField("mfmwx4mg")

  // remove
  collection.schema.removeField("5iebip25")

  // remove
  collection.schema.removeField("wmfj6nww")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h8vtd4ny",
    "name": "post_images",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "never",
        "always ask",
        "yes"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
