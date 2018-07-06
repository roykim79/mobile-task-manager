const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/dev')

const User = mongoose.model('User')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  done(null, id)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({googleId: profile.id}).then(existingUser => {
        if (existingUser) {
          debugger;
          done(null, existingUser)
        } else {
          new User({
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            googleId: profile.id,
            lastName: profile.name.familyName,
            photo: profile.photos[0].value
          })
            .save()
            .then(user => done(null, user))
        }
      })

      console.log()
      done(null, profile)
    }
  )
)