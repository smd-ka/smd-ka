/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f2xw0z7vf795kwb")

  collection.options = {
    "query": "SELECT \n  regiokon.id as id, regiokon.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), regiokon.name) AS TEXT) as name,\n  CAST(COALESCE(users.email, regiokon.email) AS TEXT) as email,\n  CAST(COALESCE(users.phonenumber, regiokon.phonenumber) AS TEXT) as phonenumber,\n  CAST(COALESCE(users.gender, regiokon.gender) AS TEXT) AS gender,\n  regiokon.[group],\n  regiokon.needs_lodging, regiokon.lodging_male, regiokon.lodging_female, regiokon.lodging_both,\n  CAST((users.allergies || regiokon.allergies) AS TEXT) as allergies, \n  CAST(COALESCE(users.vegetarian, regiokon.vegetarian) AS bool) AS vegetarian,\n  regiokon.comments\n  from regiokon LEFT JOIN users on regiokon.user = users.id ORDER BY name \n\n"
  }

  // remove
  collection.schema.removeField("mqi1fpnk")

  // remove
  collection.schema.removeField("a62bblil")

  // remove
  collection.schema.removeField("ds3yisvk")

  // remove
  collection.schema.removeField("rw0g6akv")

  // remove
  collection.schema.removeField("o6adxxov")

  // remove
  collection.schema.removeField("5zbzqjpi")

  // remove
  collection.schema.removeField("z1nf844h")

  // remove
  collection.schema.removeField("ax6n0huo")

  // remove
  collection.schema.removeField("duamsb6y")

  // remove
  collection.schema.removeField("ogbjsjs2")

  // remove
  collection.schema.removeField("twirynvw")

  // remove
  collection.schema.removeField("38nocdvk")

  // remove
  collection.schema.removeField("js2yezmy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qfkxlh6t",
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
    "id": "6zkgwk66",
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
    "id": "p18inyv4",
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
    "id": "s53b1etf",
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
    "id": "eo93hb8t",
    "name": "gender",
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
    "id": "7timw59u",
    "name": "group",
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
    "id": "8repln0m",
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
    "id": "968tkjnl",
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
    "id": "mtimpmz2",
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
    "id": "czgjdyhz",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k4pvp4ye",
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
    "id": "peryhyvk",
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
    "id": "egzkbbsw",
    "name": "comments",
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
    "query": "SELECT \n  regiokon.id as id, regiokon.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), regiokon.name) AS TEXT) as name,\n  CAST(COALESCE(users.email, regiokon.email) AS TEXT) as email,\n  CAST(COALESCE(users.phonenumber, regiokon.phonenumber) AS TEXT) as phonenumber,\n  CAST(COALESCE(users.gender, regiokon.gender) AS TEXT) AS gender,\n  regiokon.[group],\n  regiokon.needs_lodging, regiokon.lodging_male, regiokon.lodging_female, regiokon.lodging_both,\n  CAST((users.allergies || regiokon.allergies) AS TEXT) as allergies, \n  COALESCE(users.vegetarian, regiokon.vegetarian) AS vegetarian,\n  regiokon.comments\n  from regiokon LEFT JOIN users on regiokon.user = users.id ORDER BY name \n\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mqi1fpnk",
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
    "id": "a62bblil",
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
    "id": "ds3yisvk",
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
    "id": "rw0g6akv",
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
    "id": "o6adxxov",
    "name": "gender",
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
    "id": "5zbzqjpi",
    "name": "group",
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
    "id": "z1nf844h",
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
    "id": "ax6n0huo",
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
    "id": "duamsb6y",
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
    "id": "ogbjsjs2",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "twirynvw",
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
    "id": "38nocdvk",
    "name": "vegetarian",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "js2yezmy",
    "name": "comments",
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
  collection.schema.removeField("qfkxlh6t")

  // remove
  collection.schema.removeField("6zkgwk66")

  // remove
  collection.schema.removeField("p18inyv4")

  // remove
  collection.schema.removeField("s53b1etf")

  // remove
  collection.schema.removeField("eo93hb8t")

  // remove
  collection.schema.removeField("7timw59u")

  // remove
  collection.schema.removeField("8repln0m")

  // remove
  collection.schema.removeField("968tkjnl")

  // remove
  collection.schema.removeField("mtimpmz2")

  // remove
  collection.schema.removeField("czgjdyhz")

  // remove
  collection.schema.removeField("k4pvp4ye")

  // remove
  collection.schema.removeField("peryhyvk")

  // remove
  collection.schema.removeField("egzkbbsw")

  return dao.saveCollection(collection)
})
