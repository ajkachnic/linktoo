import nextConnect from 'next-connect'
import middleware from '../../middlewares/middlewares'

const handler = nextConnect()

handler.use(middleware)

handler.get((req, res) => {
  req.logout()
  req.session.passport = {}
  res.redirect('/')
})

export default handler
