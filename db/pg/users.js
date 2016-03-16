'use strict';
const pgp = require('pg-promise')({});
const cn = {
    host: process.env.HOST, // server name or IP address;
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
};

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const db = pgp(cn)

function createSecure(email, password, callback) {
    bcrypt.genSalt(function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash){
        callback(email, hash)
      })
    })
  }


function createUser(req, res, next) {
  createSecure(req.body.email, req.body.password, saveUser)

      function saveUser(email, hash) {
        db.none(`INSERT INTO users (email, password_hash)
        VALUES ($1, $2)`,
            [email, hash])
            .then(() => {
              next()
            })
            .catch(() => {
              console.log('error signing up')
            })
      }
    }

function login(req, res, next) {
  var email = req.body.email
  var password = req.body.password

  db.one(`SELECT * FROM users WHERE email LIKE $/email/`, req.body)
    .then((data) => {
      console.log(data)
        if (bcrypt.compareSync(password, data.password_hash)) {
          res.rows = data
          next()
        }
        res.status(401).json({data: "password and email do not match"})
      })
      .catch((err) => {
        console.error(err, 'error finding user')
      })
}

function allUsers(req, res, next) {
  db.any(`select * from users`)
  .then(function(data) {
    res.users = data;
    next();
  })
  .catch(function(err){
    console.error('error with select * from users', err);
  })
}

function myFriends(req, res, next) {
  db.any(`select players.email from friends
       inner join players on friends.user_2 = users.user_id
       where links.p1 = $/user_id`,
      [req.body.user])
  .then(function(data) {
    res.events = data;
    next();
  })
  .catch(function(err){
    console.error('error with select * from events', err);
  })
}

module.exports.login = login;
module.exports.createUser = createUser;
module.exports.allUsers = allUsers;
module.exports.myFriends = myFriends;
