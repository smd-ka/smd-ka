/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("05r3ecdi62xhor1")

  collection.options = {
    "query": "SELECT saft.id as id, COALESCE(users.name, saft.name) as name, COALESCE(users.allergies, saft.allergies) as allergies, saft.brings_cake, saft.is_vegetarian from saft LEFT JOIN users on saft.user = users.id WHERE saft.semester='WS23/24' ORDER BY saft.allergies DESC\n"
  }

  // remove
  collection.schema.removeField("jy1tkwjv")

  // remove
  collection.schema.removeField("i5wsjhx4")

  // remove
  collection.schema.removeField("5amdh29z")

  // remove
  collection.schema.removeField("w2dzftuv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9dulhs1z",
    "name": "name",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qutu3j1f",
    "name": "allergies",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a1puv52o",
    "name": "brings_cake",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jtfsrnd4",
    "name": "is_vegetarian",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("05r3ecdi62xhor1")

  collection.options = {
    "query": "SELECT saft.id as id, COALESCE(users.name, saft.name) as name, COALESCE(users.allergies, saft.allergies) as allergies, saft.brings_cake, saft.is_vegetarian from saft LEFT JOIN users on saft.user = users.id WHERE saft.semester='SS24' ORDER BY saft.allergies DESC\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jy1tkwjv",
    "name": "name",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i5wsjhx4",
    "name": "allergies",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5amdh29z",
    "name": "brings_cake",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w2dzftuv",
    "name": "is_vegetarian",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("9dulhs1z")

  // remove
  collection.schema.removeField("qutu3j1f")

  // remove
  collection.schema.removeField("a1puv52o")

  // remove
  collection.schema.removeField("jtfsrnd4")

  return dao.saveCollection(collection)
})
