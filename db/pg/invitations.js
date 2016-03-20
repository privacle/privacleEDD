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
};

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

function sendInvitation() {
  db.none(`insert into invitations
    (user_id, event_id)
    values ($/user_id/, $/event_id/)`,
  req.body)
  .then(function() {

  })
  .catch(function(err) {
    console.error('db/invitations sendInvitation', err);
  })
}

function sendAllInvitations(req, res, next) {
  if (res.circle.length > 0) {
    var obj = res.circle.pop;
    var invatee = {};
    for (var el in obj) {
      
    }
    sendInvitation()
  }
}

module.exports.allMyInvitations = allMyInvitations;
