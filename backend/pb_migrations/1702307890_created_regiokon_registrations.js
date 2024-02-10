/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "f2xw0z7vf795kwb",
    "created": "2023-12-11 15:18:10.138Z",
    "updated": "2023-12-11 15:18:10.138Z",
    "name": "regiokon_registrations",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mnr69d3r",
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
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.roles.id ?~ '6gonre3mfmdulha'",
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id, name from regiokon"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("f2xw0z7vf795kwb");

  return dao.deleteCollection(collection);
})
