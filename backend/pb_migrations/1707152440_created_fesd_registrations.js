/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ll6mlnr7o6y2n8s",
    "created": "2024-02-05 17:00:40.056Z",
    "updated": "2024-02-05 17:00:40.056Z",
    "name": "fesd_registrations",
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
      "query": "SELECT id FROM fesd "
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ll6mlnr7o6y2n8s");

  return dao.deleteCollection(collection);
})
