'use strict'

const express    = require('express');
const users      = express.Router();
const bodyParser = require('body-parser');
const db         = require('./../db/pg');

users.route('/')
  .get( db.allUsers, (req,res)=>res.json(res.rows) )
  // Only admin can get all users from the database
  .post( db.createUser, (req,res)=>res.json(res.rows) )
  // Create a new user

users.route('/login')
  .post( db.login, (req,res)=>res.json(res.rows) )

users.route('/logout')
  .delete( db.logout, (req,res)=>res.json(res.rows) )

users.route('/:user_id/friends')
  .get( db.myFriends, (req,res)=>res.json(res.rows) )


module.exports = users;
