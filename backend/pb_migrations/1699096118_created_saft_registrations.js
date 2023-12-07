/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "skzm3nv3gicpo9z",
    "created": "2023-11-04 11:08:38.645Z",
    "updated": "2023-11-04 11:08:38.645Z",
    "name": "saft_registrations",
    "type": "view",
    "system": false,
    "schema": [],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id FROM saft"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("skzm3nv3gicpo9z");

  return dao.deleteCollection(collection);
})
