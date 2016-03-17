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

// function passwordCheck()



module.exports.createSecure = createSecure;
