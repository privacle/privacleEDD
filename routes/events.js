'use strict'

const express = require('express');
const events = express.Router();
const bodyParser = require('body-parser');
const db = require('./../db/pg');


events.route('/')
  .get( db.allTasks, (req,res)=>res.json(res.rows) )
  .post( db.newTask, (req,res)=>res.json(res.rows) )


module.exports = events;
