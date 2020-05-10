import nextConnect from 'next-connect'
import middleware from '../middlewares/middlewares'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  if (req.session.passport) {
    const linksCollection = req.db.collection('links')
    const post = await linksCollection.findOne({
      link: req.query.link
    })

    res.json(
      post == null
        ? {
            ok: false,
            message: 'Invalid link'
          }
        : {
            ok: true,
            content: post
          }
    )
  } else {
    res.json({
      ok: false,
      message: 'User not authenticated'
    })
  }
})
export default handler
