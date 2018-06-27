const MONGO_DB_NAME = 'example_db'
const MONGO_URL = process.env.MONGODB_URI || `mongodb://localhost:27017/${MONGO_DB_NAME}`
const { EMAIL_HOST, EMAIL_USER, EMAIL_PASS, EMAIL_PORT } = process.env
module.exports = {
  MONGO_URL,
  EMAIL_HOST,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_PORT,
}
