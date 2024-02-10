/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n1hxi9hjc6unlj0")

  collection.viewRule = "@request.auth.id = user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n1hxi9hjc6unlj0")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
