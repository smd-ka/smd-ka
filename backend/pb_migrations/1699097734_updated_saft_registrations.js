/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skzm3nv3gicpo9z")

  collection.options = {
    "query": "SELECT saft.id as id, COALESCE((users.name || ' ' || users.surname), saft.name)\nas name, COALESCE(saft.allergies, users.allergies) as allergies, saft.brings_cake, saft.is_vegetarian from saft LEFT JOIN users on saft.user = users.id ORDER BY name \n"
  }

  // remove
  collection.schema.removeField("ijtfl4uf")

  // remove
  collection.schema.removeField("vhw3uufd")

  // remove
  collection.schema.removeField("1eytzmee")

  // remove
  collection.schema.removeField("0wyzmmu1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y69qmgmr",
    "name": "name",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ehdmeki3",
    "name": "allergies",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rqkz4s09",
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
    "id": "iclyj4pz",
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
  const collection = dao.findCollectionByNameOrId("skzm3nv3gicpo9z")

  collection.options = {
    "query": "SELECT saft.id as id, COALESCE((users.name || ' ' || users.surname), saft.name)\nas name, NULLIF(COALESCE(saft.allergies, users.allergies), '') as allergies, saft.brings_cake, saft.is_vegetarian from saft LEFT JOIN users on saft.user = users.id ORDER BY name \n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ijtfl4uf",
    "name": "name",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vhw3uufd",
    "name": "allergies",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1eytzmee",
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
    "id": "0wyzmmu1",
    "name": "is_vegetarian",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("y69qmgmr")

  // remove
  collection.schema.removeField("ehdmeki3")

  // remove
  collection.schema.removeField("rqkz4s09")

  // remove
  collection.schema.removeField("iclyj4pz")

  return dao.saveCollection(collection)
})
