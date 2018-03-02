const sha256 = require('sha256')
const crypto = require('crypto')
const bcrypt = require('bcrypt')

// change this
const dbName = 'example_db'

// Connection URL
const MongoDbHelper = require('./MongoDbHelper')

const url = `mongodb://localhost:27017/${dbName}`
const mongoDbHelper = new MongoDbHelper(url)

// start connection
mongoDbHelper.start(() => {
  console.log('mongodb ready')
})


const API_KEY = '__apiKey__'


function makeid(count = 5) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < count; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

exports.create_user = (req, res) => {
  const password = req.body.password
  const email = req.body.email
  // const apiKey = req.headers.authorization

  // if (apiKey !== API_KEY){
  //   res.json({ status: 'error', detail: 'api key is invalid' })
  //   return
  // }

  const userInfo = {}
  let loginToken

  const findParam = {
    'emails.address': email,
  }

  mongoDbHelper.collection('users').count(findParam).then((results) => {
    return new Promise((resolve, reject) => {
      if (results !== 0) {
        reject('user already exist')
      }
      resolve()
    })
  }).then(() => {
    // bcrypt of password
    const password2 = sha256(password)
    const bcryptHash = bcrypt.hashSync(password2, 10)

    // login token which to use login
    loginToken = makeid('4') + parseInt(new Date().getTime(), 10).toString(36)
    const hashedToken = crypto.createHash('sha256').update(loginToken).digest('base64')

    const tokenObject = {
      when: new Date(),
      hashedToken,
    }

    const insertParams = {
      createdAt: new Date(),
      services: {
        password: {
          bcrypt: bcryptHash,
        },
        resume: {
          loginTokens: [tokenObject],
        },
        email: {
          verificationTokens: [
            {
              // nameHash : nameHash,
              address: email,
              when: new Date(),
            },
          ],
        },
      },
      emails: [
        {
          address: email,
          verified: false,
        },
      ],
      profile: {},
    }

    // insert
    return mongoDbHelper.collection('users').insert(insertParams)
  }).then((results) => {
    if (results === null) {
      res.json({ status: 'error', detail: 'no such user' })
      return
    }

    userInfo._id = results._id
    userInfo.profile = results.profile

    // req.session.userId = userInfo._id
    // req.session.login_token = loginToken // maybe not necessary
    res.json({
      status: 'success',
      user: userInfo,
      login_token: loginToken,
    })
  }).catch((err) => {
    res.json({ status: 'error', detail: err })
  })
}

exports.login_with_email_password = (req, res) => {
  const password = req.body.password
  const email = req.body.email
  // let apiKey =  req.headers.authorization

  // if (apiKey !== API_KEY){
  //   res.json({ status: 'error', detail: 'api key is invalid 2' })
  //   return
  // }

  const findParam = {
    'emails.address': email,
  }

  const userInfo = {}
  let loginToken

  // insert
  mongoDbHelper.collection('users').findOne(findParam).then((results) => {
    // check password
    return new Promise((resolve, reject) => {
      if (!results) {
        reject('no such user')
      }
      if (!results.services || !results.services.password || !results.services.password.bcrypt) {
        reject('something must be wrong')
      }

      // set user info
      userInfo._id = results._id
      userInfo.profile = results.profile

      const password2 = sha256(password)

      const savedHash = results.services.password.bcrypt
      bcrypt.compare(password2, savedHash, (err, compareRes) => {
        if (err) {
          reject(err)
        }

        if (compareRes === true) {
          resolve()
        } else {
          reject('password is not valid')
        }
      })
    })
  }).then(() => {
    // issue token
    const findParamById = {
      _id: userInfo._id,
    }

    // login token
    loginToken = makeid('4') + parseInt(new Date().getTime(), 10).toString(36)
    const hashedToken = crypto.createHash('sha256').update(loginToken).digest('base64')
    const tokenObject = {
      when: new Date(),
      hashedToken,
    }

    const updParam = {
      $push: {
        'services.resume.loginTokens': tokenObject,
      },
    }

    // update
    return mongoDbHelper.collection('users').update(findParamById, updParam)
  }).then(() => {
    // set session
    res.json({
      status: 'success',
      user: {
        ...userInfo,
        email,
      },
      login_token: loginToken,
    })
  }).catch((err) => {
    res.status(500).json({ status: 'error', detail: err })
  })
}

exports.logout = (req, res) => {
  // let login_token = req.body.login_token
  const loginToken = req.session.login_token
  if (!loginToken) {
    // user is not login
    res.json({ status: 'success' })
    return
  }

  const apiKey = req.headers.authorization

  if (apiKey !== API_KEY) {
    res.json({ status: 'error', detail: 'api key is invalid' })
    return
  }

  const hashedToken = crypto.createHash('sha256').update(loginToken).digest('base64')
  const findParam = {
    'services.resume.loginTokens': {
      $elemMatch: {
        hashedToken,
      },
    },
  }

  // find user
  mongoDbHelper.collection('users').findOne(findParam).then((results) => {
    if (results === null) {
      return Promise.reject('no such token')
    }

    const findParamById = {
      _id: results._id,
    }

    const updParam = {
      $pull: {
        'services.resume.loginTokens': {
          type: 'ios',
        },
      },
    }
    return mongoDbHelper.collection('users').update(findParamById, updParam)
  }).then(() => {
    res.json({ status: 'success' })
  }).catch((err) => {
    res.json({ status: 'error', detail: err })
  })
}
