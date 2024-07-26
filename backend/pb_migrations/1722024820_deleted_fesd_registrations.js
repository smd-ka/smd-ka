migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ll6mlnr7o6y2n8s");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "ll6mlnr7o6y2n8s",
    "created": "2024-02-05 17:00:40.056Z",
    "updated": "2024-07-26 20:10:32.159Z",
    "name": "fesd_registrations",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qcmbplgl",
        "name": "name",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "ovnv8lhq",
        "name": "vegetarian",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "hcovessw",
        "name": "allergies",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.roles.id ?~ '1rbfl16lwv0676d'",
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT \n  fesd.id as id, \n  CAST(COALESCE((users.name || ' ' || users.surname), fesd.name) AS TEXT) as name,\n  CAST(COALESCE(users.vegetarian, fesd.vegetarian) AS bool) AS vegetarian,\n  CAST(COALESCE(users.allergies, fesd.allergies) AS TEXT) as allergies\n  from fesd LEFT JOIN users on fesd.user = users.id ORDER BY name \n\n"
    }
  });

  return Dao(db).saveCollection(collection);
})
