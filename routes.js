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
  return res.render('profile');
})

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



module.exports = router;
