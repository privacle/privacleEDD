'use strict';
const pgp = require('pg-promise')({});

const cn = {
    host: process.env.HOST, // server name or IP address;
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
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
  db.none(`delete from friends where user_1 = $1 and user_2 = $2`,
    [req.user.user_id, req.body.friend_id])
    .then(function() {
      next();
    })
    .catch(function(err) {
      console.error('error with pg/friends deleteFriend', err);
    })
}

function addFriendToCircle(req, res, next) {
  db.none(`insert into circles (friendship, tag)
  values ((select friend_id from friends where
      user_1 = $1  and user_2 = $2), $3)`,
  [req.user.user_id, req.body.friend, req.body.circle])
  .then(function() {
    next()
  })
  .catch(function(err) {
    console.error('pg/friends addFriendToCircle', err);
  })
}

function deleteFriendFromCircle(req, res, next) {
  db.none(`delete from circles where `)
}

function myCircles(req, res, next) {
  db.any(`select distinct on (circles.tag) circles.tag from friends
    left join circles on circles.friendship = friends.friend_id
    where users.user_id = $/user_id/`,
      req.user)
  .then(function(data) {
    res.circles = data;
    next();
  })
  .catch(function(err){
    console.error('error with db/friends myCircle', err);
  })
}

module.exports.newFriend = newFriend;
module.exports.deleteFriend = deleteFriend;
module.exports.addFriendToCircle = addFriendToCircle;
module.exports.myCircles = myCircles;
