/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vjp3hff1xatw8k8")

  collection.viewRule = "user.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vjp3hff1xatw8k8")

  collection.viewRule = "user = @request.auth.id"

  return dao.saveCollection(collection)
})
