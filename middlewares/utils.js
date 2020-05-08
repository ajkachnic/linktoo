export default function utils(req, res, next) {
  res.redirect = (url) => {
    res.statusCode = 301
    res.setHeader('Location', url)
    res.end()
  }
  return next()
}
