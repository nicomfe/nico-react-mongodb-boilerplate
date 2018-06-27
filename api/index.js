const express = require('express')

const config = require('./config')
const MongoDbHelper = require('./MongoDbHelper')

const mongoDbHelper = new MongoDbHelper(config.MONGO_URL)

// start connection
mongoDbHelper.start(() => {
  console.log('mongodb ready')
})

const router = express.Router()

router.use('/auth', require('./auth'))
// add all other routers here

module.exports = router
