'use strict';
const pgp = require('pg-promise')({});

if(process.env.ENVIRONMENT === 'production'){
  var connectionString = process.env.DATABASE_URL;
}else{
  const cn = {
      host: process.env.HOST, // server name or IP address;
      port: 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS
  }
}

const db = pgp(cn);

function newFriend(req, res, next) {
  db.none(`insert into friends (user_1, user_2)
  values ($1, $2)`, [req.user.user_id, req.body.friend_id])
  .then(function() {
    next();
  })
  .catch(function(err) {
    console.error(err);
  })
}

function deleteFriend(req, res, next) {
  db.none(`delete from friends`)
}

module.exports.newFriend = newFriend;
