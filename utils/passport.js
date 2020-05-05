import passport from 'passport'
import { Strategy as TwitterStrategy } from 'passport-twitter'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import { Strategy as GithubStrategy } from 'passport-github'
import { db as connect } from '../middlewares/database'
console.log(process.env.GOOGLE_KEY)
console.log(process.env.GOOGLE_SECRET)

const { db } = connect()
console.log(db)
passport.serializeUser(function(user, done) {
  done(null, user.id)
})
passport.deserializeUser(function(id, done) {
  done(null)
})
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_KEY,
      consumerSecret: process.env.TWITTER_SECRET,
      callbackURL: '/api/auth/twitter/callback'
    },
    async (token, tokenSecret, profile, done) => {
      console.log(profile)
      return done(null, profile)
      // const collection = db.collection('users')
      // const data = await collection.insertOne({
      //   ...profile
      // })

      // return done(null, data)
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
      console.log(profile)
      return done(null, profile)
      // const collection = db.collection('users')
      // const data = await collection.insertOne({
      //   ...profile
      // })

      // return done(null, data)
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
      console.log(profile)
      return done(null, profile)
      // const collection = db.collection('users')
      // const data = await collection.insertOne({
      //   ...profile
      // })

      // return done(null, data)
    }
  )
)

export default passport
