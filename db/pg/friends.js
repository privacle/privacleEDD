'use strict';
const pgp = require('pg-promise')({});
const cn = {
    host: process.env.HOST, // server name or IP address;
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
};

const db = pgp(cn);

function newFriend(req, res, next) {
  db.none(`insert into friends (user_1, user_2)
  values ($/current_user/, $/new_friend/)`, req.body)
}

module.exports.newFriend = newFriend;
