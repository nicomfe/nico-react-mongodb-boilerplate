const express = require('express')
const path = require('path')
const generatePassword = require('password-generator')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const dbSession = require('./db/session')
const connectDb = require('./db/connect')

const api = require('./api')

const app = express()

connectDb()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'supersectrete',
  proxy: true, // The "X-Forwarded-Proto" header will be used.
  name: 'sessionId',
  // Add HTTPOnly, Secure attributes on Session Cookie
  // If secure is set, and you access your site over HTTP, the cookie will not be set
  cookie: {
    httpOnly: true,
    secure: false,
  },
  store: dbSession(),
}))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

app.use(passport.initialize())
app.use(passport.session())

app.post('/api/create_user', api.create_user)
app.post('/api/create_password', api.create_password)
app.post('/api/forgot_password', api.forgot_password)

app.post('/api/verify_account', api.verify_account)
app.patch('/api/update_password', api.update_password)
app.post('/api/login_with_email_password', (req, res, next) => {
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) {
      res.status(500).send(authErr)
    } else if (info) {
      res.status(401).send(info)
    } else {
      req.logIn(user, (err) => {
        if (err) return res.status(500).send(err)
        if (!user.emailVerified) return res.status(500).send({ message: 'Email not verified yet.' })
        return res.status(200).send(JSON.stringify(user))
      })
    }
  })(req, res, next)
})

app.post('/api/logout', api.logout)
app.get('/api/get_current_session', api.get_current_session)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'client/build')))

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(() =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords)
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`))
})

// ERROR HANDLER
// DO NOT DELETE THE NEXT ITS THE ONLY WAY TO TELL EXPRESS THIS IS THE ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(500).send({ message: err && err.toString() })
})

const port = process.env.PORT || 5000
app.listen(port)

console.log(`Password generator listening on ${port}`)
