'use strict'

const express    = require('express');
const users      = express.Router();
const bodyParser = require('body-parser');
const db         = require('./../db/pg/users');
const secret      = "sweet sweet secret";
const expressJWT  = require('express-jwt');
const jwt         = require('jsonwebtoken');
const multer  = require('multer');
const upload = multer({ dest: 'public/uploads/' });


// profile picture upload handler
users.post('/upload', upload.any(), db.insertPhoto, (req, res) => {
  res.send(req.files);
});

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
  .post( db.createUser, (req,res)=>res.json(res.rows) )
  // Create a new user
  .put( db.updateUser, (req, res) => {
    res.json({status: 'updated user'});
  })

users.route('/login')
  .post( db.login, (req,res)=> {
    var token = jwt.sign(res.rows, secret);
    res.json({users: res.rows, token: token});
  })

// users.route('/logout')
//   .delete( db.logout, (req,res)=>res.json(res.rows) )
//

users.route('/friends')
  .get( db.myFriends, (req,res)=>res.json(res.events) ) //test

users.route('/email/:email')
  .get( db.oneUserByEmail, (req,res)=>res.json(res.user) ) //test

users.route('/id/:user_id')
  .get( db.oneUserById, (req,res)=>res.json(res.user) ) //test

users.route('/circle/:circle_name')
  .get( db.aCircle, (req,res)=>res.json(res.circle) ) //test

module.exports = users;
