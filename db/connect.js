const mongoose = require('mongoose')
const config = require('../api/config')
const loadModels = require('./models')

module.exports = function connectDb() {
  // Find the appropriate database to connect to, default to localhost if not found.
  const connect = () => {
    mongoose.connect(config.MONGO_URL, (err) => {
      if (err) {
        console.log(`===>  Error connecting to ${config.MONGO_URL}`)
        console.log(`Reason: ${err}`)
      } else {
        console.log(`===>  Succeeded in connecting to ${config.MONGO_URL}`)
      }
    })
  }
  connect()

  mongoose.connection.on('error', console.log)
  mongoose.connection.on('disconnected', connect)

  loadModels()
}
