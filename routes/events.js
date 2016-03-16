'use strict'

const express    = require('express');
const events     = express.Router();
const bodyParser = require('body-parser');
const db         = require('./../db/pg/events');


events.route('/')
  .get( db.allEvents, (req,res)=>res.json(res.events) )
  // All events created by current user and user's friends
  .post( db.newEvents, (req,res)=>res.json(res.event_id) )

events.route('/myevents/:user_id')
  .get( db.myEvents, (req,res)=>res.json(res.events) )
  // Show all events created/added by current user

events.route('/:event_id')
  // RUD a specific event created by current user
  .get( db.oneEvent, (req,res)=>res.json(res.event) )
//   .put( db.editEvent, (req,res)=>res.json(res.rows) )
//   .delete( db.deleteEvent, (req,res)=>res.json(res.rows) )
//

module.exports = events;
