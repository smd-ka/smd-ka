/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "f23hb17yd2jbvoz",
    "created": "2024-11-22 12:31:09.424Z",
    "updated": "2024-11-22 12:31:09.424Z",
    "name": "saft_prit",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6prp03o5",
        "name": "name",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "3zeneq3s",
        "name": "post_images",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "yes",
            "no_instagram",
            "no_website",
            "never"
          ]
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
      "query": "SELECT saft.id as id, COALESCE((users.name || ' ' || users.surname), (saft.name || ' ' || saft.surname)) as name, saft.post_images\nfrom saft LEFT JOIN users on saft.user = users.id WHERE saft.semester='WS24/25' ORDER BY name DESC\n"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("f23hb17yd2jbvoz");

  return dao.deleteCollection(collection);
})
