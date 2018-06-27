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

const updatePassword = (req, res, next) => {
  if (req.body.newPass !== req.body.newPassConfirm) {
    return next('password and confirm password do not match')
  }

  return User.findOne({ email: req.body.email }, (findErr, user) => {
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return next('Error trying to verify existing password')
      if (isMatch) {
        return Object.assign(user, { password: req.body.newPass }).save((saveErr) => {
          if (saveErr) return next('Couldnt save new password')
          return res.status(200).send(JSON.stringify(user))
        })
      }
      return next('Invalid existing password')
    })
  })
}

function updateUser(req, res, next) {
  return User.findOne({ email: req.body.email }, (findErr, user) => {
    if (findErr) return next('Error trying to find user')
    return Object.assign(user, {
      // ADD here list of fields to update
      password: req.body.password,
    }).save((saveErr) => {
      if (saveErr) return next('Couldnt update user')
      return res.status(200).send(JSON.stringify(user))
    })
  })
}

const createPassword = (req, res, next) => {
  if (!req.body.verifyEmailToken) return next('Missing token')
  return User.findOne({ email: req.body.email }, (findErr, user) => {
    if (findErr) return next('Error trying to find user')
    const expireDate = moment(user.resetPasswordExpires)
    if (expireDate.millisecond() < moment().millisecond) {
      return next('token expired')
    }
    return updateUser(req, res)
  })
}

const forgotPassword = (req, res, next) => {
  if (!req.body.email) {
    return next('Email is required')
  }
  return User.findOne({ email: req.body.email }, (findErr, user) => {
    if (!user) {
      return next(`Cant find a user with the email ${req.body.email}`)
    }
    const expireDate = moment().add(1, 'hours')
    const _user = Object.assign(user, { resetPasswordToken: uuid(), resetPasswordExpires: expireDate })
    return _user.save((saveErr) => {
      if (saveErr) return next(saveErr)
      emailModule.sendRestPasswordLinkEmail(_user, next)
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
      return next('User already exists')
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

const verifyAccount = (req, res, next) => {
  return User.findOne({ email: req.body.email }, (findErr, existingUser) => {
    if (existingUser) {
      if (existingUser.emailVerified) {
        return next('Account already verified')
      }
      if (req.body.token === existingUser.verifyEmailToken) {
        return Object.assign(existingUser, { emailVerified: true }).save((err, updateData) => {
          if (err) { return next(err) }
          return res.status(200).send(updateData)
        })
      }
      return next('Invalid token')
    }
    return next('No user found for the given email')
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
