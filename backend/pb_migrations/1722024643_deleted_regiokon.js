migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("n1hxi9hjc6unlj0");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "n1hxi9hjc6unlj0",
    "created": "2023-12-06 21:32:35.221Z",
    "updated": "2023-12-11 15:57:52.229Z",
    "name": "regiokon",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ipl7ymkw",
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
        "id": "tiikfhf8",
        "name": "email",
        "type": "email",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "lwwifq6l",
        "name": "phonenumber",
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
        "id": "l9lyo7ag",
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
      },
      {
        "system": false,
        "id": "quflezf2",
        "name": "needs_lodging",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "uhprx10l",
        "name": "vegetarian",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "960t2bro",
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
        "id": "7dqryy5e",
        "name": "group",
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
        "id": "hnext1sd",
        "name": "comments",
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
        "id": "jiy1uikx",
        "name": "paid",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "9pukjalb",
        "name": "lodging_female",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "ycrr6qmu",
        "name": "lodging_male",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "z2okr9om",
        "name": "lodging_both",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "11n1sjfb",
        "name": "gender",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id = user.id",
    "viewRule": null,
    "createRule": "",
    "updateRule": "@request.auth.roles.id ?~ '6gonre3mfmdulha'",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
