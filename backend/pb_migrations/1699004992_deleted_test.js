/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("e89miratosy476w");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "e89miratosy476w",
    "created": "2023-11-03 09:28:09.002Z",
    "updated": "2023-11-03 09:48:58.025Z",
    "name": "test",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "njpo36n2",
        "name": "name",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "yylvzcqd",
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
      "query": "SELECT saft.id as id, COALESCE(users.name, saft.name) as name, saft.allergies from saft LEFT JOIN users on saft.user = users.id ORDER BY saft.allergies DESC\n"
    }
  });

  return Dao(db).saveCollection(collection);
})
