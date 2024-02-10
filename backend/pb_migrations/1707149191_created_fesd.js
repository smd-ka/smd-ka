/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "44aun5nwvohgrw4",
    "created": "2024-02-05 16:06:31.440Z",
    "updated": "2024-02-05 16:06:31.440Z",
    "name": "fesd",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mrxxcixe",
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
      },
      {
        "system": false,
        "id": "nwujupt8",
        "name": "vegetarian",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "bgcdgawo",
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("44aun5nwvohgrw4");

  return dao.deleteCollection(collection);
})
