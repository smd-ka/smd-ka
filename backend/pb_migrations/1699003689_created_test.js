/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "e89miratosy476w",
    "created": "2023-11-03 09:28:09.002Z",
    "updated": "2023-11-03 09:28:09.002Z",
    "name": "test",
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
      "query": "SELECT saft.id from saft LEFT JOIN users\n"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("e89miratosy476w");

  return dao.deleteCollection(collection);
})
