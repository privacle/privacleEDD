'use strict'

const express    = require('express');
const users      = express.Router();
const bodyParser = require('body-parser');
const db         = require('./../db/pg/users');

const secret      = "sweet sweet secret";
const expressJWT  = require('express-jwt');
const jwt         = require('jsonwebtoken');

users.route('/')
//   .get( db.allUsers, (req,res)=>res.json(res.rows) )
//   // Only admin can get all users from the database
  .post( db.createUser, (req,res)=>res.json(res.rows) )
  // Create a new user

users.route('/login')
  .post( db.login, (req,res)=> {
    var token = jwt.sign(res.rows, secret);
    res.json({users: res.rows, token: token});
  })

// users.route('/logout')
//   .delete( db.logout, (req,res)=>res.json(res.rows) )
//
// users.route('/:user_id/friends')
//   .get( db.myFriends, (req,res)=>res.json(res.rows) )
//

module.exports = users;
