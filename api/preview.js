import nextConnect from 'next-connect'
import fetch from 'node-fetch'
import middleware from '../middlewares/middlewares'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  let { url } = req.query
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'http://www.' + url
  }
  const response = await fetch(
    `http://api.linkpreview.net/?key=${process.env.PREVIEW_KEY}&q="${url}"`
  )
  const json = await response.json()
  try {
    const body = {
      success: 1,
      meta: {
        title: json.title,
        description: json.description,
        image: {
          url: json.image
        }
      }
    }
    res.json(body)
  } catch {
    res.json({
      success: 0
    })
  }
})
export default handler
