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
    if (!post) {
      res.json({
        ok: false,
        message: "User doesn't have a link"
      })
    } else if (post.user.id !== req.session.passport.user) {
      res.json({
        ok: false,
        message: "User doesn't own this link"
      })
    } else {
      if (req.body.blocks) {
        const config = {
          allowedTags: ['b', 'i', 'em', 'strong', 'a', 'br'],
          allowedAttributes: {
            a: ['href']
          }
        }
        const blocks = req.body.blocks
        for (const block in blocks) {
          const clean = sanitizeHtml(blocks[block].data.text, config)
          blocks[block].data.text = clean
        }
      }
      await linksCollection.updateOne(
        {
          link: req.body.link
        },
        {
          $set: {
            ...req.body
          }
        }
      )
      res.json({
        ok: true,
        message: 'Link successfully updated'
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
