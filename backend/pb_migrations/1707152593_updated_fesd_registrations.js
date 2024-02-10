/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ll6mlnr7o6y2n8s")

  collection.options = {
    "query": "SELECT \n  fesd.id as id, \n  CAST(COALESCE((users.name || ' ' || users.surname), fesd.name) AS TEXT) as name,\n  CAST(COALESCE(users.vegetarian, fesd.vegetarian) AS bool) AS vegetarian,\n  CAST(COALESCE(users.allergies, fesd.allergies) AS TEXT) as allergies\n  from fesd LEFT JOIN users on fesd.user = users.id ORDER BY name \n\n"
  }

  // remove
  collection.schema.removeField("bfklhh6l")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tpnbytgf",
    "name": "name",
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
    "id": "ir4eiy28",
    "name": "vegetarian",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kott397e",
    "name": "allergies",
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
  const collection = dao.findCollectionByNameOrId("ll6mlnr7o6y2n8s")

  collection.options = {
    "query": "SELECT \n  fesd.id as id, \n  CAST(COALESCE((users.name || ' ' || users.surname), fesd.name) AS TEXT) as name\n  from fesd LEFT JOIN users on fesd.user = users.id ORDER BY name \n\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bfklhh6l",
    "name": "name",
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

  // remove
  collection.schema.removeField("tpnbytgf")

  // remove
  collection.schema.removeField("ir4eiy28")

  // remove
  collection.schema.removeField("kott397e")

  return dao.saveCollection(collection)
})
