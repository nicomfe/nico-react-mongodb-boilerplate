const sha256 = require('sha256');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// change this
const db_name = 'example_db';

// Connection URL
const MongoDbHelper = require('./MongoDbHelper');
let url = 'mongodb://localhost:27017/'+db_name;
let mongoDbHelper = new MongoDbHelper(url);

// start connection
mongoDbHelper.start(() => {
  console.log("mongodb ready")
});


const API_KEY = '__api_key__';


function makeid (count) {
  if (!count){
    count = 5;
  }

  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < count; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

exports.create_user = (req, res) => {

  let password =  req.body.password;
  let email =  req.body.email;
  let api_key =  req.headers.authorization

  // if (api_key !== API_KEY){
  //   res.json({ status: 'error', detail: 'api key is invalid' });
  //   return;
  // }

  let user_info = {}
  let login_token

  let find_param = {
    'emails.address':email
  }
  mongoDbHelper.collection("users").count(find_param)
  .then((results) => {
    return new Promise((resolve, reject) => {
      if (results != 0){
        reject("user already exist")
      }
      resolve()
    })
  })
  .then(() => {
    // bcrypt of password
    let password2 = sha256(password)
    var bcrypt_hash = bcrypt.hashSync(password2, 10);

    // login token which to use login
    login_token = makeid('4') + parseInt(new Date().getTime()).toString(36);
    const hashed_token = crypto.createHash('sha256').update(login_token).digest('base64');

    const token_object = {
      'when':new Date(),
      'hashedToken':hashed_token,
    };

    let insert_params = {
      createdAt: new Date(),
      services:{
        password : {
          bcrypt : bcrypt_hash
        },
        resume : {
          loginTokens : [token_object]
        },
        email : {
          verificationTokens : [
            {
              // nameHash : nameHash,
              address : email,
              when : new Date(),
            }
          ]
        },
      },
      emails : [
        {
          "address" : email,
          "verified" : false
        }
      ],
      profile : {},
    }

    // insert
    return mongoDbHelper.collection("users").insert(insert_params)
  })
  .then((results) => {

    if ( results === null ) {
      res.json({ status: 'error', detail: 'no such user' });
      return;
    }

    user_info._id = results._id;
    user_info.profile = results.profile;

    // req.session.userId = user_info._id
    req.session.login_token = login_token // maybe not necessary

    res.json({
      status: 'success',
      user: user_info,
      login_token: login_token,
    })

  })
  .catch((err) => {
    res.json({ status: 'error', detail: err });
  })
};

exports.login_with_email_password = (req, res) => {

  let password =  req.body.password;
  let email =  req.body.email;

  let api_key =  req.headers.authorization

  // if (api_key !== API_KEY){
  //   res.json({ status: 'error', detail: 'api key is invalid 2' });
  //   return;
  // }

  let find_param = {
    'emails.address':email
  }

  let user_info = {};
  let login_token

  // insert
  mongoDbHelper.collection("users").findOne(find_param)
  .then((results) => {
    // check password

    return new Promise( (resolve, reject) => {

      if (!results){
        reject("no such user")
      }
      if (!results.services || !results.services.password || !results.services.password.bcrypt){
        reject("something must be wrong")
      }

      // set user info
      user_info._id = results._id;
      user_info.profile = results.profile;

      let password2 = sha256(password)

      const saved_hash = results.services.password.bcrypt

      bcrypt.compare(password2, saved_hash, (err, res) => {
        if (err){
          reject(err)
        }

        if (res === true){
          resolve()
        } else {
          reject("password is not valid")
        }
      });
    } )
  })
  .then(() => {
    // issue token

    let find_param = {
      _id: user_info._id
    }

    // login token
    login_token = makeid('4') + parseInt(new Date().getTime()).toString(36);
    const hashed_token = crypto.createHash('sha256').update(login_token).digest('base64');

    const token_object = {
      'when':new Date(),
      'hashedToken':hashed_token,
    };

    let upd_param = {
      '$push':{
        'services.resume.loginTokens':token_object
      }
    };

    // update
    return mongoDbHelper.collection("users").update(find_param, upd_param)
  })
  .then((results) => {

    // set session
    req.session.login_token

    res.json({
      status: 'success',
      user: {
        ...user_info,
        email,
      },
      login_token: login_token,
    })

  })
  .catch((err) => {
    res.status(500).json({status: 'error', detail: err})
  })
}

exports.logout = (req, res) => {

  // let login_token = req.body.login_token;
  let login_token = req.session.login_token;
  if (!login_token){
    // user is not login
    res.json({status: 'success'})
    return;
  }

  let api_key =  req.headers.authorization


  if (api_key !== API_KEY){
    res.json({ status: 'error', detail: 'api key is invalid' });
    return;
  }

  const hashed_token = crypto.createHash('sha256').update(login_token).digest('base64');
  let find_param = {
    'services.resume.loginTokens':{
      '$elemMatch':{
        'hashedToken':hashed_token
      }
    }
  }

  // find user
  mongoDbHelper.collection("users").findOne(find_param)
  .then((results) => {

    if (results === null){
      return Promise.reject("no such token")
    }

    let find_param = {
      '_id':results._id
    };
    var upd_param = {
      '$pull':{
        'services.resume.loginTokens':{
          'type':'ios'
        }
      }
    };
    return mongoDbHelper.collection("users").update(find_param, upd_param)
  })
  .then(() => {
    return new Promise((resolve, reject) => {

    })
    req.session.destroy((err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
  .then(() => {
    res.json({status: 'success'})
  })
  .catch((err) => {
     res.json({status: 'error', detail: err})
  })
}
