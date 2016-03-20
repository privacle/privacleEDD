'use strict';
const pgp = require('pg-promise')({
    // Initialization Options
});

const cn = {
    host: process.env.HOST, // server name or IP address;
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
}

const db = pgp(cn);

function allMyInvitations(req, res, next) {
  db.any(`select * from invitations where user_id = $/user_id`, req.user)
  .then(function(data) {
    res.invitations = data;
    next();
  })
  .catch(function(err){
    console.error('error with pg/invitations allInvitations', err);
  })
}

function sendInvitation(req, res, next) {
  db.none(`insert into invitations where`)
}

module.exports.allMyInvitations = allMyInvitations;
