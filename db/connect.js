const mongoose = require('mongoose')
const config = require('../api/utils/config')
const loadModels = require('./models')

const logger = require('../api/utils/logger')

module.exports = function connectDb() {
  // Find the appropriate database to connect to, default to localhost if not found.
  const connect = () => {
    mongoose.connect(config.MONGO_URL, (err) => {
      if (err) {
        logger.error(`===>  Error connecting to ${config.MONGO_URL}`)
        logger.error(`Reason: ${err}`)
      } else {
        logger.info(`===>  Succeeded in connecting to ${config.MONGO_URL}`)
      }
    })
  }
  connect()

  mongoose.connection.on('error', logger.error)
  mongoose.connection.on('disconnected', connect)

  loadModels()
}
