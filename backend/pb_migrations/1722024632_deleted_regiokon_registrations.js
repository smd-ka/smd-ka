migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("f2xw0z7vf795kwb");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "f2xw0z7vf795kwb",
    "created": "2023-12-11 15:18:10.138Z",
    "updated": "2023-12-12 20:21:01.183Z",
    "name": "regiokon_registrations",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qfkxlh6t",
        "name": "paid",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "6zkgwk66",
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
        "id": "p18inyv4",
        "name": "email",
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
        "id": "s53b1etf",
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
        "id": "eo93hb8t",
        "name": "gender",
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
        "id": "7timw59u",
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
        "id": "8repln0m",
        "name": "needs_lodging",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "968tkjnl",
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
        "id": "mtimpmz2",
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
        "id": "czgjdyhz",
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
        "id": "k4pvp4ye",
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
        "id": "peryhyvk",
        "name": "vegetarian",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "egzkbbsw",
        "name": "comments",
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
    "listRule": "@request.auth.roles.id ?~ '6gonre3mfmdulha'",
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT \n  regiokon.id as id, regiokon.paid,\n  CAST(COALESCE((users.name || ' ' || users.surname), regiokon.name) AS TEXT) as name,\n  CAST(COALESCE(users.email, regiokon.email) AS TEXT) as email,\n  CAST(COALESCE(users.phonenumber, regiokon.phonenumber) AS TEXT) as phonenumber,\n  CAST(COALESCE(users.gender, regiokon.gender) AS TEXT) AS gender,\n  regiokon.[group],\n  regiokon.needs_lodging, regiokon.lodging_male, regiokon.lodging_female, regiokon.lodging_both,\n  CAST((users.allergies || regiokon.allergies) AS TEXT) as allergies, \n  CAST(COALESCE(users.vegetarian, regiokon.vegetarian) AS bool) AS vegetarian,\n  regiokon.comments\n  from regiokon LEFT JOIN users on regiokon.user = users.id ORDER BY name \n\n"
    }
  });

  return Dao(db).saveCollection(collection);
})
