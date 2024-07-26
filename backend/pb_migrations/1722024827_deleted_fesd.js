migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("44aun5nwvohgrw4");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "44aun5nwvohgrw4",
    "created": "2024-02-05 16:06:31.440Z",
    "updated": "2024-02-05 16:52:00.013Z",
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
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "bgcdgawo",
        "name": "allergies",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "btvc8p6b",
        "name": "user",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id = user.id",
    "viewRule": null,
    "createRule": "",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
