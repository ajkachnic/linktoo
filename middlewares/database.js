import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
export async function db() {
  if (!client.isConnected()) await client.connect()
  const dbClient = client
  const db = client.db(process.env.DB_NAME)
  return {
    db,
    dbClient
  }
}

export default async function database(req, res, next) {
  if (!client.isConnected()) await client.connect()
  req.dbClient = client
  req.db = client.db(process.env.DB_NAME)
  return next()
}
