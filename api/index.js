const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const localPassport = require('../db/passport/local')
const User = require('../db/models/user')
const config = require('./config')

passport.use(new LocalStrategy({ usernameField: 'email' }, localPassport))

// Connection URL
const MongoDbHelper = require('./MongoDbHelper')

const mongoDbHelper = new MongoDbHelper(config.MONGO_URL)

// start connection
mongoDbHelper.start(() => {
  console.log('mongodb ready')
})


const API_KEY = '__apiKey__'

exports.create_user = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  })

  return User.findOne({ email: req.body.email }, (findErr, existingUser) => {
    if (existingUser) {
      return res.status(409).send({ message: 'User already exists' })
    }

    return user.save((saveErr) => {
      if (saveErr) return next(saveErr)
      return req.login(user, (loginErr) => {
        if (loginErr) {
          return res.status(500).send({ message: loginErr })
        }
        return req.session.save(() => {
          return res.status(200).send(JSON.stringify(user))
        })
      })
    })
  })
}

exports.login_with_email_password = (req, res, next) => {
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) {
      res.status(500).send(`Ups. Something broke! ${authErr}`)
    } else if (info) {
      res.status(401).send(info)
    } else {
      res.status(200).send(JSON.stringify(user))
    }
  })(req, res, next)
}

exports.logout = (req, res) => {
  req.logout()
  res.json({ status: 'success' })
  return res.status(200)
}

exports.get_current_session = (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).send(JSON.stringify(req.user))
  }
  return res.status(200)
}
