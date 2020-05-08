import nextConnect from 'next-connect'
import middleware from '../../../middlewares/middlewares'

import passport from '../../../utils/passport'

const handler = nextConnect()

handler.use(middleware)
handler.use(
  passport.authenticate('github', {
    failWithError: true,
    failureRedirect: '/error',
    successRedirect: '/app'
  })
)
// handler.get((req, res) => {
//   res.statusCode = 301
//   res.setHeader('Location', '/app')
//   res.end()
// })

export default handler
