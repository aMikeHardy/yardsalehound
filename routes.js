'use strict';

const express = require('express');
const router = express.Router();

var User = require('./models.js').User;
var Sale = require('./models.js').Sale;

// GET homepage
router.get('/', (req, res, next)=>{
  return res.render('index', {title: 'Yardsale Hound'});
});

// Get Register
router.get('/register', (req, res, next)=>{
  return res.render('register', {title: 'Register'});
});

// Get Login
router.get('/login', (req, res, next)=>{
  return res.render('login', {title: 'Log In'});
});

// Get list
router.get('/list', (req, res, next)=>{
  return res.render('list', {title: 'List Your Sale'});
});

// Get profile
router.get('/profile', (req, res, next)=>{
  if(!req.session.userId){
    const err = new Error('You are not authorized to view this page.');
    err.status = 403;
    return next(err);
  }
  User.findById(req.session.userId)
    .exec(function (error, user){
      if(error){
        return next(error);
      }else {
        return res.render('profile', {title: 'Profile', name: user.name});
      }
    })
});

// Get logout
router.get('/logout', (req, res, next)=>{
  if(req.session){
    req.session.destroy(function(err){
      if(err){
        return next(err);
      }else{
        console.log('User logged out');
        return res.redirect('/');
      }
    });
  }
});

// Get error page
router.get('/error', (req, res, next)=>{
  return res.render('error', {title: "Error: Sorry, there was an error"});
});

// Post to create a new User
router.post('/users', (req, res, next)=>{
  const user = new User(req.body);
  user.save((err, question)=>{
    if (err) {
      err.status= 400;
      return next(err);
    }
    res.status(201);
    res.redirect('/login');
  });
});

// POST to /login to authenticate credentials and create a user session
router.post('/login', function(req, res, next){
  if(req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user){
      if( error || !user ){
        const err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
          req.session.userId = user._id;
          console.log(user.name + ", logged in successfully");
          return res.redirect('/profile');
      }
    });
  } else {
    const err = new Error('Email and password are required');
    err.status = 401;
    return next(err);
  }
});


















module.exports = router;
