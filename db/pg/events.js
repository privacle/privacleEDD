'use strict';
const pgp = require('pg-promise')({
    // Initialization Options
});
const cn = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
};

const db = pgp(cn);

function getEvents(req, res, next) {
  db.any(`select * from events`)
  .then(function(data) {
    res.events = data;
    next();
  })
  .catch(function(err){
    console.error('error with select * from events', err);
  })
}

module.exports.getEvents = getEvents;
