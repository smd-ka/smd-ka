/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f2xw0z7vf795kwb")

  collection.options = {
    "query": "SELECT \n  regiokon.id as id, regiokon.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), regiokon.name) AS TEXT) as name,\n  CAST(COALESCE(users.email, regiokon.email) AS TEXT) as email,\n  CAST(COALESCE(users.phonenumber, regiokon.phonenumber) AS TEXT) as phonenumber,\n  regiokon.needs_lodging,\n  CAST((users.allergies || regiokon.allergies) AS TEXT) as allergies, \n  CAST((users.vegetarian || regiokon.vegetarian) AS BIT) AS vegetarian\n  from regiokon LEFT JOIN users on regiokon.user = users.id ORDER BY name \n\n"
  }

  // remove
  collection.schema.removeField("6x1b4qjr")

  // remove
  collection.schema.removeField("huzqxwnm")

  // remove
  collection.schema.removeField("gxh62xnm")

  // remove
  collection.schema.removeField("0trqmu3b")

  // remove
  collection.schema.removeField("tlnqedty")

  // remove
  collection.schema.removeField("nldq8fau")

  // remove
  collection.schema.removeField("n3ofyuf2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ou6imktb",
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
    "id": "kvgoay1u",
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
    "id": "ahvintms",
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
    "id": "nvkaqqcr",
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
    "id": "3mtpn4hr",
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
    "id": "gtcluya0",
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
    "id": "k489p7bd",
    "name": "vegetarian",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f2xw0z7vf795kwb")

  collection.options = {
    "query": "SELECT \n  regiokon.id as id, regiokon.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), regiokon.name) AS TEXT) as name,\n  CAST(COALESCE(users.email, regiokon.email) AS TEXT) as email,\n  CAST(COALESCE(users.phonenumber, regiokon.phonenumber) AS TEXT) as phonenumber,\n  regiokon.needs_lodging,\n  CAST((users.allergies || regiokon.allergies) AS TEXT) as allergies, \n  CAST((users.vegetarian || regiokon.vegetarian) AS INT) AS vegetarian\n  from regiokon LEFT JOIN users on regiokon.user = users.id ORDER BY name \n\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6x1b4qjr",
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
    "id": "huzqxwnm",
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
    "id": "gxh62xnm",
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
    "id": "0trqmu3b",
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
    "id": "tlnqedty",
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
    "id": "nldq8fau",
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
    "id": "n3ofyuf2",
    "name": "vegetarian",
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

  // remove
  collection.schema.removeField("ou6imktb")

  // remove
  collection.schema.removeField("kvgoay1u")

  // remove
  collection.schema.removeField("ahvintms")

  // remove
  collection.schema.removeField("nvkaqqcr")

  // remove
  collection.schema.removeField("3mtpn4hr")

  // remove
  collection.schema.removeField("gtcluya0")

  // remove
  collection.schema.removeField("k489p7bd")

  return dao.saveCollection(collection)
})
