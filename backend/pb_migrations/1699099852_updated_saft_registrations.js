/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skzm3nv3gicpo9z")

  collection.options = {
    "query": "SELECT \n  saft.id as id,\n  CAST(COALESCE((users.name || ' ' || users.surname), saft.name) AS TEXT) as name,\n  CAST(COALESCE(users.email, saft.email) AS TEXT) as email,\n  CAST(COALESCE(users.phonenumber, saft.phonenumber) AS TEXT) as phonenumber,\n  saft.takes_bike, saft.takes_train, saft.takes_car,\n  saft.ticket, saft.brings_cake, saft.is_vegetarian,\n  CAST((users.allergies || ', ' || saft.allergies) AS TEXT) as allergies, \n  saft.would_sleep_on_floor, saft.comments\n  from saft LEFT JOIN users on saft.user = users.id WHERE saft.semester='WS23/24' ORDER BY name \n\n"
  }

  // remove
  collection.schema.removeField("jxr1ual9")

  // remove
  collection.schema.removeField("fqiwtmrq")

  // remove
  collection.schema.removeField("zepus5ex")

  // remove
  collection.schema.removeField("hbb6sskv")

  // remove
  collection.schema.removeField("iqogptxf")

  // remove
  collection.schema.removeField("rlveprsg")

  // remove
  collection.schema.removeField("bi6huyqe")

  // remove
  collection.schema.removeField("mmbqrncj")

  // remove
  collection.schema.removeField("mjvabgzb")

  // remove
  collection.schema.removeField("mvaar80h")

  // remove
  collection.schema.removeField("nxqzhg6a")

  // remove
  collection.schema.removeField("h9tlgiqy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7dxnnmg7",
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
    "id": "1g3zm1nw",
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
    "id": "nu8jysvm",
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
    "id": "iz7i6vns",
    "name": "takes_bike",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ygbpb4kg",
    "name": "takes_train",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bx1hqzfz",
    "name": "takes_car",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b9asivk2",
    "name": "ticket",
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
    "id": "r4h3jp7n",
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
    "id": "f1yl81ye",
    "name": "is_vegetarian",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sekouas4",
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
    "id": "eynntriu",
    "name": "would_sleep_on_floor",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bfgu7u7p",
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
  const collection = dao.findCollectionByNameOrId("skzm3nv3gicpo9z")

  collection.options = {
    "query": "SELECT \n  saft.id as id,\n  CAST(COALESCE((users.name || ' ' || users.surname), saft.name) AS TEXT) as name,\n  CAST(COALESCE(users.email, saft.email) AS TEXT) as email,\n  CAST(COALESCE(users.phonenumber, saft.phonenumber) AS TEXT) as phonenumber,\n  saft.takes_bike, saft.takes_train, saft.takes_car,\n  saft.ticket, saft.brings_cake, saft.is_vegetarian,\n  CAST((users.allergies || saft.allergies) AS TEXT) as allergies, \n  saft.would_sleep_on_floor, saft.comments\n  from saft LEFT JOIN users on saft.user = users.id WHERE saft.semester='WS23/24' ORDER BY name \n\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jxr1ual9",
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
    "id": "fqiwtmrq",
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
    "id": "zepus5ex",
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
    "id": "hbb6sskv",
    "name": "takes_bike",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iqogptxf",
    "name": "takes_train",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rlveprsg",
    "name": "takes_car",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bi6huyqe",
    "name": "ticket",
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
    "id": "mmbqrncj",
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
    "id": "mjvabgzb",
    "name": "is_vegetarian",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mvaar80h",
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
    "id": "nxqzhg6a",
    "name": "would_sleep_on_floor",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h9tlgiqy",
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
  collection.schema.removeField("7dxnnmg7")

  // remove
  collection.schema.removeField("1g3zm1nw")

  // remove
  collection.schema.removeField("nu8jysvm")

  // remove
  collection.schema.removeField("iz7i6vns")

  // remove
  collection.schema.removeField("ygbpb4kg")

  // remove
  collection.schema.removeField("bx1hqzfz")

  // remove
  collection.schema.removeField("b9asivk2")

  // remove
  collection.schema.removeField("r4h3jp7n")

  // remove
  collection.schema.removeField("f1yl81ye")

  // remove
  collection.schema.removeField("sekouas4")

  // remove
  collection.schema.removeField("eynntriu")

  // remove
  collection.schema.removeField("bfgu7u7p")

  return dao.saveCollection(collection)
})
