/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "05r3ecdi62xhor1",
    "created": "2023-11-03 09:13:30.882Z",
    "updated": "2023-11-03 09:13:30.882Z",
    "name": "saft_kitchen",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "afugok5y",
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
    "options": {
      "query": "SELECT id, allergies from saft"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("05r3ecdi62xhor1");

  return dao.deleteCollection(collection);
})
