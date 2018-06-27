const session = require('express-session')
const connectMongo = require('connect-mongo')

const config = require('../api/utils/config')

const MongoStore = connectMongo(session)

function dbSession() {
  return new MongoStore(
    {
      url: config.MONGO_URL,
      autoReconnect: true,
    }
  )
}

module.exports = dbSession
