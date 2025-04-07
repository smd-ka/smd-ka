/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("05r3ecdi62xhor1")

  collection.options = {
    "query": "SELECT saft.id as id, COALESCE(users.name, saft.name) as name, COALESCE(users.allergies, saft.allergies) as allergies, saft.brings_cake, saft.is_vegetarian from saft LEFT JOIN users on saft.user = users.id WHERE saft.semester='WS24/25' ORDER BY saft.allergies DESC\n"
  }

  // remove
  collection.schema.removeField("9dulhs1z")

  // remove
  collection.schema.removeField("qutu3j1f")

  // remove
  collection.schema.removeField("a1puv52o")

  // remove
  collection.schema.removeField("jtfsrnd4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8iynweqs",
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
    "id": "by24oady",
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
    "id": "h0k45aog",
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
    "id": "wg8lvvmd",
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
    "query": "SELECT saft.id as id, COALESCE(users.name, saft.name) as name, COALESCE(users.allergies, saft.allergies) as allergies, saft.brings_cake, saft.is_vegetarian from saft LEFT JOIN users on saft.user = users.id WHERE saft.semester='WS23/24' ORDER BY saft.allergies DESC\n"
  }

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

  // remove
  collection.schema.removeField("8iynweqs")

  // remove
  collection.schema.removeField("by24oady")

  // remove
  collection.schema.removeField("h0k45aog")

  // remove
  collection.schema.removeField("wg8lvvmd")

  return dao.saveCollection(collection)
})
