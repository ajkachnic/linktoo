import nextConnect from 'next-connect'
import middleware from '../../middlewares/middlewares'
import passport from '../../utils/passport'

const handler = nextConnect()

handler.use(middleware)

handler.get(passport.authenticate('twitter'))

export default handler
