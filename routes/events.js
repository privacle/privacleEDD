'use strict'

const express     = require('express');
const events      = express.Router();
const bodyParser  = require('body-parser');
const db          = require('./../db/pg/events');
const invitations = require('./../db/pg/invitations');
const users       = require('./../db/pg/users');
const multer  = require('multer');
const upload = multer({ dest: 'public/uploads/' });


// event picture upload handler
events.post('/upload', upload.any(), db.insertEventPhoto, (req, res) => {
  console.log(req.files, req.body);
  res.send(req.files);
});

events.route('/')
  .get( db.allEvents, (req,res)=>res.json(res.events) )
  // All events created by current user and user's friends
  .post( db.newEvents, parseCircles, (req,res)=>res.json(res.event_id) )

events.route('/myevents')
  .get( db.myEvents, (req,res)=>res.json(res.events) )
  // Show all events created/added by current user

events.route('/id/:event_id')
  // RUD a specific event created by current user
  .get( db.oneEventById, (req,res)=>res.json(res.event) )
//   .put( db.editEvent, (req,res)=>res.json(res.rows) )
  .delete( db.deleteMyEvent, (req,res)=>res.json(req.method) )
//
events.route('/name/:event_name')
  .get( db.oneEventByName, (req,res)=>res.json(res.event) )

events.route('/owner/:event_owner')
  .get( db.oneEventByOwner, (req,res)=>res.json(res.event) )

function testCircles(req, res, next) {
  console.log(req.body.circles);
  if (req.body.circles.length > 1) {
    req.params.circle_name = req.body.circles.pop();
    console.log(req.params.circle_name);
    invitations.aCircleForInvitations(req, res, invitations.sendAllInvitations, testCircles);
    console.log('made it through once');
    //testCircles(req, res, next);
  } else {
    next()
  }
}

function parseCircles(req, res, next) {
  req.body.circles = JSON.parse(req.body.circles);
  testCircles(req, res, next);
}


module.exports = events;
