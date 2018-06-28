const mongodb = require('mongodb')
const uuid = require('uuid')

const config = require('./config')
/*
 http://mongodb.github.io/node-mongodb-native/2.0/tutorials/crud_operations/
 */

class MongoDbHelper {
  constructor(url) {
    this.url = url
    this.mongoClient = mongodb.MongoClient
    this.db = null
  }

  start(callback) {
    this.mongoClient.connect(this.url, (err, client) => {
      this.db = client.db(config.MONGO_DB_NAME)
      callback(this.db)
    })
  }

  collection(collectionName) {
    const mongoDbCollection = this.db.collection(collectionName)
    const collection = {
      insert: (_model) => { // TODO: insert many
        const model = _model
        return new Promise((resolve, reject) => {
          model._id = uuid.v1()
          mongoDbCollection.insertOne(model, (err) => {
            if (err) { reject(err) }
            resolve(model)
          })
        })
      },

      update: (findParam, updParam) => { // TODO: update many
        return new Promise((resolve, reject) => {
          mongoDbCollection.updateOne(findParam, updParam, (err, result) => {
            if (err) { reject(err) }
            resolve(result)
          })
        })
      },

      find: (param) => { // TODO: search
        return new Promise((resolve, reject) => {
          mongoDbCollection.find(param).toArray((err, docs) => {
            if (err) { reject(err) }
            resolve(docs)
          })
        })
      },

      findById: (id) => {
        return new Promise((resolve, reject) => {
          mongoDbCollection.findOne({ _id: id }, (err, doc) => {
            if (err) { reject(err) }
            resolve(doc)
          })
        })
      },

      delete: (id) => { // TODO: delete many
        return new Promise((resolve, reject) => {
          mongoDbCollection.removeOne({ _id: id }, (err, result) => {
            if (err) { reject(err) }
            resolve(result)
          })
        })
      },

      findOne: (param) => {
        return new Promise((resolve, reject) => {
          mongoDbCollection.findOne(param, (err, doc) => {
            if (err) { reject(err) }
            resolve(doc)
          })
        })
      },

      count: (param) => {
        return new Promise((resolve, reject) => {
          mongoDbCollection.count(param, (err, doc) => {
            if (err) { reject(err) }
            resolve(doc)
          })
        })
      },

    }

    return collection
  }
}

module.exports = MongoDbHelper
