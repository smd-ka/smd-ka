migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ll6mlnr7o6y2n8s")

  // remove
  collection.schema.removeField("kukymewl")

  // remove
  collection.schema.removeField("bbbpcoyd")

  // remove
  collection.schema.removeField("sncaayc6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qcmbplgl",
    "name": "name",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ovnv8lhq",
    "name": "vegetarian",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hcovessw",
    "name": "allergies",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ll6mlnr7o6y2n8s")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kukymewl",
    "name": "name",
    "type": "text",
    "required": false,
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
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("qcmbplgl")

  // remove
  collection.schema.removeField("ovnv8lhq")

  // remove
  collection.schema.removeField("hcovessw")

  return dao.saveCollection(collection)
})
