/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("44aun5nwvohgrw4")

  collection.listRule = "@request.auth.id = user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("44aun5nwvohgrw4")

  collection.listRule = "@request.auth.id != user.id"

  return dao.saveCollection(collection)
})