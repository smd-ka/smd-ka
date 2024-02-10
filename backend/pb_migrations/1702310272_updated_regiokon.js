/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n1hxi9hjc6unlj0")

  collection.updateRule = "@request.auth.roles.id ?~ '6gonre3mfmdulha'"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n1hxi9hjc6unlj0")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
