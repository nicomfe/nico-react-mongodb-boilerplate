const MONGO_DB_NAME = 'example_db'

const { EMAIL_HOST, EMAIL_USER, EMAIL_PASS, EMAIL_PORT, APP_HOST, MONGODB_URI } = process.env

const MONGO_URL = MONGODB_URI || `mongodb://localhost:27017/${MONGO_DB_NAME}`
const APP_HOST_URL = APP_HOST || 'http://localhost:3000'

module.exports = {
  MONGO_URL,
  EMAIL_HOST,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_PORT,
  APP_HOST_URL,
}
