import passport from 'passport'
import { Strategy as TwitterStrategy } from 'passport-twitter'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import { Strategy as GithubStrategy } from 'passport-github'
import { db } from '../middlewares/database'
let database
db().then((val) => (database = val.db))

passport.serializeUser(function(user, done) {
  done(null, user.id)
})
passport.deserializeUser(async function(id, done) {
  const collection = database.collection('users')

  const user = await collection.findOne({
    id
  })
  done(null, user)
})
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_KEY,
      consumerSecret: process.env.TWITTER_SECRET,
      callbackURL: '/api/auth/twitter/callback'
    },
    async (token, tokenSecret, profile, done) => {
      const collection = database.collection('users')
      const user = await collection.findOne({
        id: profile.id,
        provider: profile.provider
      })
      if (user) {
        return done(null, user)
      }
      await collection.insertOne({
        ...profile
      })

      return done(null, profile)
    }
  )
)
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_KEY,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const collection = database.collection('users')
      await collection.insertOne({
        ...profile
      })

      return done(null, profile)
    }
  )
)
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: '/api/auth/github/callback'
    },
    async (token, tokenSecret, profile, done) => {
      const collection = database.collection('users')
      await collection.insertOne({
        ...profile
      })

      return done(null, profile)
    }
  )
)

export default passport
