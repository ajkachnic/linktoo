import nextConnect from 'next-connect'
import middleware from '../../middlewares/middlewares'

const handler = nextConnect()

handler.use(middleware)

handler.get((req, res) => {
  console.log(req.session.passport)
  if (req.session.passport.user) {
    res.json({
      ok: true,
      message: 'User is authenticated'
    })
  } else {
    res.json({
      ok: false,
      message: 'User not authenticated'
    })
  }
})
export default handler
