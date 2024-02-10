/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f2xw0z7vf795kwb")

  collection.options = {
    "query": "SELECT \n  regiokon.id as id, regiokon.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), regiokon.name) AS TEXT) as name,\n  CAST(COALESCE(users.email, regiokon.email) AS TEXT) as email,\n  CAST(COALESCE(users.phonenumber, regiokon.phonenumber) AS TEXT) as phonenumber,\n  CAST(COALESCE(users.gender, regiokon.gender) AS TEXT) AS gender,\n  regiokon.[group],\n  regiokon.needs_lodging, regiokon.lodging_male, regiokon.lodging_female, regiokon.lodging_both,\n  CAST((users.allergies || regiokon.allergies) AS TEXT) as allergies, \n  COALESCE(users.vegetarian, regiokon.vegetarian) AS vegetarian,\n  regiokon.comments\n  from regiokon LEFT JOIN users on regiokon.user = users.id ORDER BY name \n\n"
  }

  // remove
  collection.schema.removeField("3bmbq7xl")

  // remove
  collection.schema.removeField("e1mlnauw")

  // remove
  collection.schema.removeField("s5fzc31i")

  // remove
  collection.schema.removeField("phpbzoli")

  // remove
  collection.schema.removeField("daatotca")

  // remove
  collection.schema.removeField("twh6jqf1")

  // remove
  collection.schema.removeField("n0fvicxd")

  // remove
  collection.schema.removeField("irxehvee")

  // remove
  collection.schema.removeField("l7j5aesx")

  // remove
  collection.schema.removeField("kuwqwiug")

  // remove
  collection.schema.removeField("ie4ijp0y")

  // remove
  collection.schema.removeField("oiwneovd")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f2xw0z7vf795kwb")

  collection.options = {
    "query": "SELECT \n  regiokon.id as id, regiokon.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), regiokon.name) AS TEXT) as name,\n  CAST(COALESCE(users.email, regiokon.email) AS TEXT) as email,\n  CAST(COALESCE(users.phonenumber, regiokon.phonenumber) AS TEXT) as phonenumber,\n  CAST(COALESCE(users.gender, regiokon.gender) AS TEXT) AS gender,\n  regiokon.needs_lodging, regiokon.lodging_male, regiokon.lodging_female, regiokon.lodging_both,\n  CAST((users.allergies || regiokon.allergies) AS TEXT) as allergies, \n  COALESCE(users.vegetarian, regiokon.vegetarian) AS vegetarian,\n  regiokon.comments\n  from regiokon LEFT JOIN users on regiokon.user = users.id ORDER BY name \n\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3bmbq7xl",
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
    "id": "e1mlnauw",
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
    "id": "s5fzc31i",
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
    "id": "phpbzoli",
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
    "id": "daatotca",
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
    "id": "twh6jqf1",
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
    "id": "n0fvicxd",
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
    "id": "irxehvee",
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
    "id": "l7j5aesx",
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
    "id": "kuwqwiug",
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
    "id": "ie4ijp0y",
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
    "id": "oiwneovd",
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

  return dao.saveCollection(collection)
})
