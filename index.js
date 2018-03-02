const express = require('express')
const path = require('path')
const generatePassword = require('password-generator')
const bodyParser = require('body-parser')
const session = require('express-session')

const api = require('./api')

const app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({
  secret: 'this is a super session key',
  resave: true,
  saveUninitialized: false,
}))

app.post('/api/create_user', api.create_user)
app.post('/api/login_with_email_password', api.login_with_email_password)
app.post('/api/logout', api.logout)

// Serve static files from the React app
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

  console.log(`Sent ${count} passwords`)
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`))
})

const port = process.env.PORT || 5000
app.listen(port)

console.log(`Password generator listening on ${port}`)
