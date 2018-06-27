const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const log = require('winston')


const dbSession = require('./db/session')
const connectDb = require('./db/connect')
const config = require('./api/utils/config')

log.level = config.LOG_LEVEL

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

app.use('/api', require('./api'))

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'client/build')))

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`))
})

// ERROR HANDLER
// DO NOT DELETE THE NEXT ITS THE ONLY WAY TO TELL EXPRESS THIS IS THE ERROR HANDLER
app.use((err, req, res, next) => {
  log.debug(err && err.toString())
  res.status(500).send({ message: err && err.toString() })
})

const port = process.env.PORT || 5000
app.listen(port)

log.info(`App listening on ${port}`)
