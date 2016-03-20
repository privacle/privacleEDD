'use strict';
const pgp = require('pg-promise')({});

const cn = {
    host: process.env.HOST, // server name or IP address;
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
}

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
            .catch((err) => {
              console.log('error signing up', err.code)
              res.rows = err.code
              next()
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

function oneUserByEmail(req, res, next) {
  db.one(`select * from users where email like $/email/`, req.params)
  .then(function(data) {
    res.user = data;
    next();
  })
  .catch(function(err) {
    console.error('error with pg/users oneUser ', err);
  })
}

function oneUserById(req, res, next) {
  var user = +req.params.user_id;
  console.log('wierd shit: ',user);
  db.one(`select * from users where user_id = $1`,
    [user])
    .then(function(data) {
      res.user = data;
      next();
    })
    .catch(function(err) {
      console.error('error with db/users oneUserById',err);
    })
}

function myFriends(req, res, next) {
  console.log('made it to here');
  db.any(`select users.email, users.user_id from friends
       inner join users on friends.user_2 = users.user_id
       where friends.user_1 = $/user_id/`,
      req.user)
  .then(function(data) {
    console.log(data);
    res.events = data;
    next();
  })
  .catch(function(err){
    console.error('error with pg/users myFriends', err);
  })
}

function myCircles(req, res, next) {
  db.any(`select distinct on (circles.tag) circles.tag from friends
    left join circles on circles.friendship = friends.friend_id
    where users.user_id = $/user_id/`,
      req.user)
  .then(function(data) {
    res.events = data;
    next();
  })
  .catch(function(err){
    console.error('error with db/users myCircle', err);
  })
}

function aCircle(req, res, next) {
  db.any(`select user_2 from circles
    left join circles on circles.friendship = friends.friend_id
    where users.user_id = $1
    and circles.tag like $2`,
      [req.user.user_id, req.body.circle])
  .then(function(data) {
    res.circle = data;
    next();
  })
  .catch(function(err){
    console.error('error with db/users aCircle', err);
  })
}

module.exports.login = login;
module.exports.createUser = createUser;
module.exports.allUsers = allUsers;
module.exports.oneUserByEmail = oneUserByEmail;
module.exports.oneUserById = oneUserById;
module.exports.myFriends = myFriends;
module.exports.myCircles = myCircles;
module.exports.aCircle = aCircle;
