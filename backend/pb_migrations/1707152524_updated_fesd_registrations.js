/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ll6mlnr7o6y2n8s")

  collection.options = {
    "query": "SELECT id FROM fesd "
  }

  // remove
  collection.schema.removeField("bfklhh6l")

  return dao.saveCollection(collection)
})
