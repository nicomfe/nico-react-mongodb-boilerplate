const MONGO_DB_NAME = 'example_db'

const { EMAIL_HOST, EMAIL_USER, EMAIL_PASS, EMAIL_PORT, APP_HOST, MONGODB_URI, NODE_ENV } = process.env

const MONGO_URL = MONGODB_URI || `mongodb://localhost:27017/${MONGO_DB_NAME}`
const APP_HOST_URL = APP_HOST || 'http://localhost:3000'
const LOG_LEVEL_BY_ENV = NODE_ENV === 'production' ? 'error' : 'info'

module.exports = {
  MONGO_DB_NAME,
  MONGO_URL,
  EMAIL_HOST,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_PORT,
  APP_HOST_URL,
  LOG_LEVEL: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : LOG_LEVEL_BY_ENV,
}
