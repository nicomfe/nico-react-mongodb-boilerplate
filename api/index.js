const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const moment = require('moment')
const localPassport = require('../db/passport/local')
const User = require('../db/models/user')
const config = require('./config')
const emailModule = require('./email')
const uuid = require('uuid/v4')

passport.use(new LocalStrategy({ usernameField: 'email' }, localPassport))

// Connection URL
const MongoDbHelper = require('./MongoDbHelper')

const mongoDbHelper = new MongoDbHelper(config.MONGO_URL)

// start connection
mongoDbHelper.start(() => {
  console.log('mongodb ready')
})

const updatePassword = (req, res) => {
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

function updateUser(req, res) {
  return User.findOne({ email: req.body.email }, (findErr, user) => {
    if (findErr) return res.status(400).send({ message: 'Error trying to find user' })
    return Object.assign(user, {
      // ADD here list of fields to update
      password: req.body.password,
    }).save((saveErr) => {
      if (saveErr) return res.status(400).send({ message: 'Couldnt update user' })
      return res.status(200).send(JSON.stringify(user))
    })
  })
}

const createPassword = (req, res) => {
  if (!req.body.verifyEmailToken) res.status(400).send({ message: 'Missing token' })
  return User.findOne({ email: req.body.email }, (findErr, user) => {
    if (findErr) return res.status(400).send({ message: 'Error trying to find user' })
    const expireDate = moment(user.resetPasswordExpires)
    if (expireDate.millisecond() < moment().millisecond) {
      console.log('token expired', expireDate)
      return res.status(400).send({ message: 'token expired' })
    }
    console.log('Updating user')
    return updateUser(req, res)
  })
}

const forgotPassword = (req, res, next) => {
  if (!req.body.email) {
    throw new Error('Email is required')
  }
  return User.findOne({ email: req.body.email }, (findErr, user) => {
    if (!user) {
      return res.status(409).send({ message: `Cant find a user with the email ${req.body.email}` })
    }
    const expireDate = moment().add(1, 'hours')
    const _user = Object.assign(user, { resetPasswordToken: uuid(), resetPasswordExpires: expireDate })
    return _user.save((saveErr) => {
      if (saveErr) return next(saveErr)
      emailModule.sendRestPasswordLinkEmail(_user)
      return res.status(200).send({ message: 'We sent you an email with the link to reset your password' })
    })
  })
}

const createUser = (req, res, next) => {
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

const logout = (req, res) => {
  req.logout()
  res.json({ status: 'success' })
  return res.status(200)
}

const getCurrentSession = (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).send(JSON.stringify(req.user))
  }
  return res.status(200)
}

const verifyAccount = (req, res) => {
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

module.exports = {
  update_user: updateUser,
  update_password: updatePassword,
  create_password: createPassword,
  forgot_password: forgotPassword,
  create_user: createUser,
  logout,
  get_current_session: getCurrentSession,
  verify_account: verifyAccount,
}
