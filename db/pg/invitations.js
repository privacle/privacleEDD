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

function allMyInvitationsWhere(req, res, next) {
  db.any(`select * from invitations where user_id = $1 and $2`,
    [req.user.user_id, req.body.field])
    .then(function(data) {
      res.invitations = data;
    })
    .catch(function(err) {
      console.error('db/invitations allMyInvitationsWhere', err);
    })
}

function sendInvitation(invatee) {
  console.log('Invite: ', invatee);
  db.none(`insert into invitations
    (user_id, event_id)
    values ($1, $2)`,
  [invatee, req.body.event_id])
  .then(function() {

  })
  .catch(function(err) {
    console.error('db/invitations sendInvitation', err);
  })
}

function sendAllInvitations(req, res, next) {
  if (res.circle.length > 0) {
    var obj = res.circle.pop;
    var invatee;
    for (var el in obj) {
      invatee = obj[el];
    }
    sendInvitation(invatee);
    sendAllInvitations(req, res, next);
  } else {
    next();
  }
}

module.exports.allMyInvitations = allMyInvitations;
module.exports.allMyInvitationsWhere = allMyInvitationsWhere;
module.exports.sendAllInvitations = sendAllInvitations;
