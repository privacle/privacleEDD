'use strict'

const express    = require('express');
const users      = express.Router();
const bodyParser = require('body-parser');
const db         = require('./../db/pg/users');
const secret      = "sweet sweet secret";
const expressJWT  = require('express-jwt');
const jwt         = require('jsonwebtoken');

users.use(function(error, request, response, next) {
  if(error.name === 'UnauthorizredError') {
    response.status(401).json({message: 'you need an authoriation token to view condifential information'});
  }
});

function test(req, res, next) {
  console.log(req.user);
  next()
}

users.route('/')
  .get( test, db.allUsers, (req,res)=>res.json(res.users) ) //test
  // Only admin can get all users from the database


// users.route('/logout')
//   .delete( db.logout, (req,res)=>res.json(res.rows) )
//

users.route('/friends')
  .get( db.myFriends, (req,res)=>res.json(res.rows) ) //test

users.route('/:user_id/friends')
  .get( db.myCircle, (req,res)=>res.json(res.rows) ) //test

module.exports = users;
