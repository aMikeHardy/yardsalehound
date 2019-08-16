
const express = require('express');
const router = express.Router();

//require .env
require('dotenv').config();

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


router.get('/sales/:zip', (req, res, next)=>{
  Myapi = process.env.MY_GAPI;
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate()-1);

  Sale.find({$and: [{zip: req.params.zip}, {date: {$gte: yesterday}}]}).sort('date').exec(function(err, sales){
    if(!sales){
      console.log("No sales found");
    }
    if(err) return next(err);
    console.log(sales);
    //res.json(sales);
    res.send({ sales: sales, Myapi: Myapi });
  });
});

// GET registration page
router.get('/register', (req, res, next)=>{
  return res.render('register');
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

// POST to list a new sale. Redirect to profile page to show list of sales made by user
router.post('/list', (req, res, next)=>{
  const sale = new Sale({
    user: req.session.userId,
    date: req.body.date,
    dateString: req.body.dateString,
    start: req.body.start,
    end: req.body.end,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    description: req.body.description
  });
  sale.save((err, question)=>{
    if(err){
      err.status= 400;
      return next(err);
    }
    res.status(201);
    res.redirect('/profile');
  })
});

// Get Sales posted by User to show on Profile page
router.get('/sales', (req, res, next)=>{
  Myapi = process.env.MY_GAPI;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() -1);

  Sale.find({$and: [{user: req.session.userId}, {date: {$gte: yesterday}}]}).sort('date').exec(function(err, sales){
    if(!sales){
      console.log("No sales found");
    }
    if(err) return next(err);
    console.log(sales);
    res.send({sales: sales, Myapi: Myapi });
  });
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


module.exports = router;
