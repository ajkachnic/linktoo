import session from 'express-session'
import MongoStore from 'connect-mongo'

export default function(req, res, next) {
  const store = new MongoStore({
    client: req.dbClient,
    dbName: process.env.DB_NAME
  })
  return session({
    secret: 'this is my secret',
    resave: false,
    saveUninitialized: true,
    store
  })(req, res, next)
}
