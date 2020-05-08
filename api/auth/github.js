import nextConnect from 'next-connect'
import middleware from '../../middlewares/middlewares'

import passport from '../../utils/passport'
import { db } from '../../middlewares/database'

let database
db().then((val) => (database = val.db))

const handler = nextConnect()

handler.use(middleware)
handler.use(passport.authenticate('github'))

export default handler
