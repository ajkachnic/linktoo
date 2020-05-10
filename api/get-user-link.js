import nextConnect from 'next-connect'
import middleware from '../middlewares/middlewares'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  if (req.session.passport) {
    const usersCollection = req.db.collection('users')
    const linksCollection = req.db.collection('links')
    const user = await usersCollection.findOne({
      id: req.session.passport.user
    })
    if (user) {
      const body = {
        'user.id': user.id || req.session.passport,
        'user.provider': user.provider
      }

      const post = await linksCollection.findOne(body)
      res.json(post == null ? {} : post)
    } else {
      res.json({
        ok: false,
        message: 'User not authenticated'
      })
    }
  } else {
    res.json({
      ok: false,
      message: 'User not authenticated'
    })
  }
})
export default handler
