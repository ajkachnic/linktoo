import session from 'express-session'

const MongoDBStore = require('connect-mongodb-session')(session)

export default function(req, res, next) {
  const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'session',
    databaseName: process.env.DB_NAME
  })
  return session({
    secret: process.env.SESSION_SECRET || 'fndakfnajkdfnakdjfn',
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //   maxAge: 1000 * 60 * 60 * 24 * 7
    // },
    store
  })(req, res, next)
}
