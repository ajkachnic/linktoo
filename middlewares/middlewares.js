import nextConnect from 'next-connect'
import session from 'express-session'

import passport from '../utils/passport'
import database from './database'

const middleware = nextConnect()

middleware
  .use(database)
  .use(
    session({
      secret: 'this is my secret',
      resave: false,
      saveUninitialized: true
    })
  )
  .use(passport.initialize())
  .use(passport.session())

export default middleware
