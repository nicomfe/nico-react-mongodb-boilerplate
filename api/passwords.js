const express = require('express')
const generatePassword = require('password-generator')

const router = express.Router()

router.get('/generate', (req, res) => {
  const count = 5

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(() =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords)
})

module.exports = router
