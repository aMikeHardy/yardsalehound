'use strict';

const express = require('express');
const router = express.Router();

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

// Get error page
router.get('/error', (req, res, next)=>{
  return res.render('error', {title: "Error: Sorry, there was an error"});
});





module.exports = router;
