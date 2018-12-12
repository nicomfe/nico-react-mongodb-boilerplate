const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const moment = require('moment')
const express = require('express')
const uuid = require('uuid/v4')

const logger = require('./utils/logger')
const localPassport = require('../db/passport/local')
const User = require('../db/models/user')
const emailModule = require('./utils/email')

const router = express.Router()

passport.use(new LocalStrategy({ usernameField: 'email' }, localPassport))

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

/**
 * Middleware for all the routes in this file
 */
router.use((req, res, next) => {
  // this is just an example delete if not needed
  next()
})

router.patch('/update_password', (req, res, next) => {
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
      logger.error('Invalid existing password entered')
      return next('Invalid existing password')
    })
  })
})

router.post('/create_password', (req, res, next) => {
  if (!req.body.verifyEmailToken) return next('Missing token')
  return User.findOne({ email: req.body.email }, (findErr, user) => {
    if (findErr) return next('Error trying to find user')
    const expireDate = moment(user.resetPasswordExpires)
    if (expireDate.millisecond() < moment().millisecond) {
      return next('token expired')
    }
    return updateUser(req, res, next)
  })
})

router.post('/forgot_password', (req, res, next) => {
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
})

router.post('/create_user', (req, res, next) => {
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
      emailModule.sendEmail(user, next)
      return res.status(200).send(JSON.stringify(user))
    })
  })
})

router.post('/logout', (req, res) => {
  req.logout()
  res.json({ status: 'success' })
  return res.status(200)
})

router.get('/get_current_session', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).send(JSON.stringify(req.user))
  }
  return res.status(200)
})

router.patch('/verify_account', (req, res, next) => {
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
})

router.post('/login_with_email_password', (req, res, next) => {
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) {
      res.status(500).send(authErr)
    } else if (info) {
      res.status(401).send(info)
    } else {
      req.logIn(user, (err) => {
        if (err) return next(err)
        if (!user.emailVerified) return next('Email not verified yet.')
        return res.status(200).send(JSON.stringify(user))
      })
    }
  })(req, res, next)
})

module.exports = router
