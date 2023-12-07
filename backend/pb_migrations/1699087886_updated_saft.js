/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vjp3hff1xatw8k8")

  collection.listRule = "@request.auth.user.roles.id = 'saftcoordinator' "

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vjp3hff1xatw8k8")

  collection.listRule = "user.id = @request.auth.id || @request.auth.user.roles.id = 'saftcoordinator' "

  return dao.saveCollection(collection)
})
