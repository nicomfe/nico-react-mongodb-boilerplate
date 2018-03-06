const MONGO_DB_NAME = 'example_db'
const MONGO_URL = process.env.MONGODB_URI || `mongodb://localhost:27017/${MONGO_DB_NAME}`

module.exports = {
  MONGO_URL,
}
