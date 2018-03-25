const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const localPassport = require('../db/passport/local')
const User = require('../db/models/user')
const config = require('./config')
const emailModule = require('./email')

passport.use(new LocalStrategy({ usernameField: 'email' }, localPassport))

// Connection URL
const MongoDbHelper = require('./MongoDbHelper')

const mongoDbHelper = new MongoDbHelper(config.MONGO_URL)

// start connection
mongoDbHelper.start(() => {
  console.log('mongodb ready')
})

exports.update_password = (req, res) => {
  if (req.body.newPass !== req.body.newPassConfirm) {
    throw new Error('password and confirm password do not match')
  }

  return User.findOne({ email: req.body.email }, (findErr, user) => {
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.status(400).send({ message: 'Error trying to verify existing password' })
      if (isMatch) {
        return Object.assign(user, { password: req.body.newPass }).save((saveErr) => {
          if (saveErr) return res.status(400).send({ message: 'Couldnt save new password' })
          return res.status(200).send(JSON.stringify(user))
        })
      }
      return res.status(400).send({ message: 'Invalid existing password' })
    })
  })
}

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
      emailModule.sendEmail(user)
      return res.status(200).send(JSON.stringify(user))
    })
  })
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

exports.verify_account = (req, res) => {
  return User.findOne({ email: req.body.email }, (findErr, existingUser) => {
    if (existingUser) {
      if (existingUser.emailVerified) {
        return res.status(200).send({ message: 'Account already verified' })
      }
      if (req.body.token === existingUser.verifyEmailToken) {
        return Object.assign(existingUser, { emailVerified: true }).save((err, updateData) => {
          if (err) {
            return res.status(400).send(err)
          }
          return res.status(200).send(updateData)
        })
      }
      return res.status(400).send({ message: 'Invalid token' })
    }
    return res.status(400).send({ message: 'No user found for the given email' })
  })
}
