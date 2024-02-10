/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f2xw0z7vf795kwb")

  collection.options = {
    "query": "SELECT \n  regiokon.id as id, regiokon.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), regiokon.name) AS TEXT) as name,\n  CAST(COALESCE(users.email, regiokon.email) AS TEXT) as email,\n  CAST(COALESCE(users.phonenumber, regiokon.phonenumber) AS TEXT) as phonenumber,\n  regiokon.needs_lodging,\n  CAST((users.allergies || regiokon.allergies) AS TEXT) as allergies, \n  CAST((users.vegetarian || regiokon.vegetarian) AS TEXT) as vegetarian\n  from regiokon LEFT JOIN users on regiokon.user = users.id ORDER BY name \n\n"
  }

  // remove
  collection.schema.removeField("mnr69d3r")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "em403sih",
    "name": "paid",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ne7lunfo",
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
    "id": "902j4qvp",
    "name": "email",
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
    "id": "rngp2vxk",
    "name": "phonenumber",
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
    "id": "gnf1niim",
    "name": "needs_lodging",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jynvah6t",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f5pzahy3",
    "name": "vegetarian",
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
  const collection = dao.findCollectionByNameOrId("f2xw0z7vf795kwb")

  collection.options = {
    "query": "SELECT id, name from regiokon"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mnr69d3r",
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
  collection.schema.removeField("em403sih")

  // remove
  collection.schema.removeField("ne7lunfo")

  // remove
  collection.schema.removeField("902j4qvp")

  // remove
  collection.schema.removeField("rngp2vxk")

  // remove
  collection.schema.removeField("gnf1niim")

  // remove
  collection.schema.removeField("jynvah6t")

  // remove
  collection.schema.removeField("f5pzahy3")

  return dao.saveCollection(collection)
})
