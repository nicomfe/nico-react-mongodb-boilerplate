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

//
// function makeid(count = 5) {
//   let text = ''
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   for (let i = 0; i < count; i += 1) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length))
//   }
//
//   return text
// }

exports.create_user = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  })
  console.log('aca0p00000')
  return User.findOne({ email: req.body.email }, (findErr, existingUser) => {
    console.log('aca0')
    if (existingUser) {
      console.log('aca0.21')
      return res.status(409).send({ message: 'User already exists' })
    }

    return user.save((saveErr) => {
      console.log('aca')
      if (saveErr) return next(saveErr)
      console.log('aca2')
      return req.login(user, (loginErr) => {
        console.log('aca3')
        if (loginErr) {
          return res.status(500).send({ message: loginErr })
        }
        console.log('aca4')
        return req.session.save(() => {
          return res.status(200).send(JSON.stringify(user))
        })
      })
    })
  })
}

// exports.create_user = (req, res) => {
//   const password = req.body.password
//   const email = req.body.email
//   // const apiKey = req.headers.authorization
//
//   // if (apiKey !== API_KEY){
//   //   res.json({ status: 'error', detail: 'api key is invalid' })
//   //   return
//   // }
//
//   const userInfo = {}
//   let loginToken
//
//   const findParam = {
//     'emails.address': email,
//   }
//
//   mongoDbHelper.collection('users').count(findParam).then((results) => {
//     return new Promise((resolve, reject) => {
//       if (results !== 0) {
//         reject('user already exist')
//       }
//       resolve()
//     })
//   }).then(() => {
//     // bcrypt of password
//     const password2 = sha256(password)
//     const bcryptHash = bcrypt.hashSync(password2, 10)
//
//     // login token which to use login
//     loginToken = makeid('4') + parseInt(new Date().getTime(), 10).toString(36)
//     const hashedToken = crypto.createHash('sha256').update(loginToken).digest('base64')
//
//     const tokenObject = {
//       when: new Date(),
//       hashedToken,
//     }
//
//     const insertParams = {
//       createdAt: new Date(),
//       services: {
//         password: {
//           bcrypt: bcryptHash,
//         },
//         resume: {
//           loginTokens: [tokenObject],
//         },
//         email: {
//           verificationTokens: [
//             {
//               // nameHash : nameHash,
//               address: email,
//               when: new Date(),
//             },
//           ],
//         },
//       },
//       emails: [
//         {
//           address: email,
//           verified: false,
//         },
//       ],
//       profile: {},
//     }
//
//     // insert
//     return mongoDbHelper.collection('users').insert(insertParams)
//   }).then((results) => {
//     if (results === null) {
//       res.json({ status: 'error', detail: 'no such user' })
//       return
//     }
//
//     userInfo._id = results._id
//     userInfo.profile = results.profile
//
//     // req.session.userId = userInfo._id
//     // req.session.login_token = loginToken // maybe not necessary
//     res.json({
//       status: 'success',
//       user: userInfo,
//       login_token: loginToken,
//     })
//   }).catch((err) => {
//     res.json({ status: 'error', detail: err })
//   })
// }

// exports.login_with_email_password = passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })

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
