migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skzm3nv3gicpo9z")

  // remove
  collection.schema.removeField("xbtdjtnz")

  // remove
  collection.schema.removeField("wrmplpux")

  // remove
  collection.schema.removeField("2ieualmp")

  // remove
  collection.schema.removeField("afgwjpdz")

  // remove
  collection.schema.removeField("0zorppev")

  // remove
  collection.schema.removeField("uoeovith")

  // remove
  collection.schema.removeField("8kl0lwps")

  // remove
  collection.schema.removeField("vs0anxuv")

  // remove
  collection.schema.removeField("ctbvxgai")

  // remove
  collection.schema.removeField("exewz1vy")

  // remove
  collection.schema.removeField("bmt8bpna")

  // remove
  collection.schema.removeField("ayilzw6z")

  // remove
  collection.schema.removeField("ouijfb0t")

  // remove
  collection.schema.removeField("ivgkugou")

  // remove
  collection.schema.removeField("urebsvw2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fzkjtvj1",
    "name": "paid",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wia8yt4k",
    "name": "name",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p8igd1qd",
    "name": "email",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oobgiwwg",
    "name": "phonenumber",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qioacmla",
    "name": "takes_bike",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sa95jt03",
    "name": "takes_train",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jido2uez",
    "name": "takes_car",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ntx6kadw",
    "name": "ticket",
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
    "id": "oywq7ze9",
    "name": "brings_cake",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2n9oq45f",
    "name": "is_vegetarian",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pzbtv2oq",
    "name": "allergies",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ql6zakft",
    "name": "would_sleep_on_floor",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dt1ugxgu",
    "name": "semester",
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
    "id": "apnsqxhg",
    "name": "comments",
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
    "id": "fkfxkm8b",
    "name": "post_images",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "never",
        "always ask",
        "yes"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skzm3nv3gicpo9z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xbtdjtnz",
    "name": "paid",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wrmplpux",
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
    "id": "2ieualmp",
    "name": "email",
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
    "id": "afgwjpdz",
    "name": "phonenumber",
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
    "id": "0zorppev",
    "name": "takes_bike",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uoeovith",
    "name": "takes_train",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8kl0lwps",
    "name": "takes_car",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vs0anxuv",
    "name": "ticket",
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
    "id": "ctbvxgai",
    "name": "brings_cake",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "exewz1vy",
    "name": "is_vegetarian",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bmt8bpna",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ayilzw6z",
    "name": "would_sleep_on_floor",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ouijfb0t",
    "name": "semester",
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
    "id": "ivgkugou",
    "name": "comments",
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
    "id": "urebsvw2",
    "name": "post_images",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "never",
        "always ask",
        "yes"
      ]
    }
  }))

  // remove
  collection.schema.removeField("fzkjtvj1")

  // remove
  collection.schema.removeField("wia8yt4k")

  // remove
  collection.schema.removeField("p8igd1qd")

  // remove
  collection.schema.removeField("oobgiwwg")

  // remove
  collection.schema.removeField("qioacmla")

  // remove
  collection.schema.removeField("sa95jt03")

  // remove
  collection.schema.removeField("jido2uez")

  // remove
  collection.schema.removeField("ntx6kadw")

  // remove
  collection.schema.removeField("oywq7ze9")

  // remove
  collection.schema.removeField("2n9oq45f")

  // remove
  collection.schema.removeField("pzbtv2oq")

  // remove
  collection.schema.removeField("ql6zakft")

  // remove
  collection.schema.removeField("dt1ugxgu")

  // remove
  collection.schema.removeField("apnsqxhg")

  // remove
  collection.schema.removeField("fkfxkm8b")

  return dao.saveCollection(collection)
})
