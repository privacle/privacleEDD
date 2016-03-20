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

function allEvents(req, res, next) {
  db.any(`select * from events`)
  .then(function(data) {
    res.events = data;
    next();
  })
  .catch(function(err){
    console.error('error with select * from events', err);
  })
}

function newEvents(req, res, next) {
  req.body.user_id = req.user.user_id;
  db.one(`insert into events
    (name,
      owner,
      lat,
      lng,
      event_date,
      event_time,
      description,
      location,
      img_url)
  values
  ($/name/,
    $/user_id/,
    $/lat/,
    $/lng/,
    $/event_date/,
    $/event_time/,
    $/description/,
    $/location/,
    $/img_url/)
  returning event_id`,req.body)
    .then(function(data) {
      res.event_id = data;
      next();
    })
    .catch(function(err) {
      console.error('error with insert into events',err);
    })
}

function myEvents(req, res, next) {
  db.any(`select * from events where owner = $1`,
    [req.user.user_id])
  .then(function(data) {
    res.events = data;
    next();
  })
  .catch(function(err){
    console.error('error with select * from events where owner like $/owner/', err);
  })
}

function oneEventById(req, res, next) {
  req.params.event_id = parseInt(req.params.event_id);
  db.one(`select * from events where event_id = $/event_id/`,
    req.params)
    .then(function(data) {
      res.event = data;
      next();
    })
    .catch(function(err) {
      console.error('error with oneEventById',err);
    })
}

function oneEventByName(req, res, next) {
  req.params.event_name = '%' + req.params.event_name + '%';
  db.any(`select * from events where name like $/event_name/`,
    req.params)
    .then(function(data) {
      res.event = data;
      next();
    })
    .catch(function(err) {
      console.error('error with oneEventByName',err);
    })
}

function oneEventByOwner(req, res, next) {
  db.one(`select * from events where owner = $/event_owner/`,
    req.params)
    .then(function(data) {
      res.event = data;
      next();
    })
    .catch(function(err) {
      console.error('error with oneEventByName',err);
    })
}

function deleteMyEvent(req, res, next) {
  console.log(req.body);
  db.none(`delete from events where event_id = $/event_id/`,
    req.body)
    .then(function() {
      console.log('Deleted one event');
      next();
    })
    .catch(function(err) {
      console.error('error with deleting', err);
    })
}

function mySavedEvents(req, res, next) {
  db.any(`select * from events where saved`)
  .then(function(data) {
    res.events = data;
    next();
  })
  .catch(function(err) {
    console.error('pg/events mySavedEvents', err);
  })
}

function saveEvent(req, res, next) {
  db.none(`update events set saved = true where`)
}

module.exports.allEvents = allEvents;
module.exports.newEvents = newEvents;
module.exports.myEvents = myEvents;
module.exports.oneEventById = oneEventById;
module.exports.oneEventByName = oneEventByName;
module.exports.oneEventByOwner = oneEventByOwner;
module.exports.deleteMyEvent = deleteMyEvent;
module.exports.mySavedEvents = mySavedEvents;
