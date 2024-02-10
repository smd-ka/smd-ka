/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ll6mlnr7o6y2n8s")

  collection.listRule = "@request.auth.roles.id ?~ '1rbfl16lwv0676d'"

  // remove
  collection.schema.removeField("xwyc2d6x")

  // remove
  collection.schema.removeField("eznjomzg")

  // remove
  collection.schema.removeField("mrdqsjyl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kukymewl",
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
    "id": "bbbpcoyd",
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
    "id": "sncaayc6",
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

  collection.listRule = "@request.auth.roles.id ?~ '6gonre3mfmdulha'"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xwyc2d6x",
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
    "id": "eznjomzg",
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
    "id": "mrdqsjyl",
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

  // remove
  collection.schema.removeField("kukymewl")

  // remove
  collection.schema.removeField("bbbpcoyd")

  // remove
  collection.schema.removeField("sncaayc6")

  return dao.saveCollection(collection)
})
