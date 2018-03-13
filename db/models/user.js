/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')

// Other oauthtypes to be added

/*
 User Schema
 */

const UserSchema = new mongoose.Schema({
  email: { type: String, lowercase: true },
  emailVerified: { type: Boolean, default: false },
  password: String,
  tokens: Array,
  profile: {},
  verifyEmailToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  google: {},
  twitter: {},
})

function encryptPassword(next) {
  const user = this
  if (!user.isModified('password')) return next()
  return bcrypt.genSalt(5, (saltErr, salt) => {
    if (saltErr) return next(saltErr)
    return bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
      if (hashErr) return next(hashErr)
      user.password = hash
      return next()
    })
  })
}

/**
 * Password hash middleware.
 */
UserSchema.pre('save', encryptPassword)

/*
 Defining our own custom document instance method
 */
UserSchema.methods = {
  comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return cb(err)
      return cb(null, isMatch)
    })
  },
}

/**
 * Statics
 */

UserSchema.statics = {}

module.exports = mongoose.model('User', UserSchema)
