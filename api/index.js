const express = require('express')

const config = require('./utils/config')
const MongoDbHelper = require('./utils/MongoDbHelper')
const logger = require('./utils/logger')

const mongoDbHelper = new MongoDbHelper(config.MONGO_URL)

// start connection
mongoDbHelper.start(() => {
  logger.info('Mongodb ready')
})

const router = express.Router()

router.use('/auth', require('./auth'))
router.use('/passwords', require('./passwords'))
// add all other routers here

module.exports = router
