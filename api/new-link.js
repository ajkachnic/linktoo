import nextConnect from 'next-connect'
import sanitizeHtml from 'sanitize-html'

import middleware from '../middlewares/middlewares'

const handler = nextConnect()

handler.use(middleware)

handler.post(async (req, res) => {
  if (req.session.passport) {
    const linksCollection = req.db.collection('links')
    const usersCollection = req.db.collection('users')

    const post = await linksCollection.findOne({
      link: req.body.link
    })
    const user = await usersCollection.findOne({
      id: req.session.passport.user
    })
    if (post) {
      res.json({
        ok: false,
        message: 'Link already taken'
      })
    } else {
      if (req.body.blocks) {
        let config = {
          allowedTags: ['b', 'i', 'em', 'strong', 'a', 'br'],
          allowedAttributes: {
            a: ['href']
          }
        }
        let blocks = req.body.blocks
        for (let block in blocks) {
          let clean = sanitizeHtml(blocks[block].data.text, config)
          blocks[block].data.text = clean
        }
      }
      await linksCollection.insertOne({
        ...req.body,
        user: {
          provider: user.provider,
          id: user.id
        }
      })
      res.json({
        ok: true,
        message: 'Link successfully created'
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
