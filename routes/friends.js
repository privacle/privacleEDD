'use strict'

const express    = require('express');
const friends    = express.Router();
const bodyParser = require('body-parser');
const db         = require('./../db/pg/friends');


friends.route('/')
  .post( db.newFriend, (req,res)=>res.json(res.rows) )
  .delete( db.deleteFriend, (req,res)=>res.json(req.method) )

friends.route('/circles')
  .get( db.myCircles, (req, res)=>res.json(res.circles) )
  .post( db.addFriendToCircle, (req,res)=>res.json(req.method) )
module.exports = friends;
