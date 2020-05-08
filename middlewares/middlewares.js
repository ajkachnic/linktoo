import nextConnect from 'next-connect'

import passport from '../utils/passport'
import database from './database'
import session from './session'
import utils from './utils'

const middleware = nextConnect()

middleware
  .use(database)
  .use(session)
  .use(utils)
  .use(passport.initialize())
  .use(passport.session())

export default middleware
