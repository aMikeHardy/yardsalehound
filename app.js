'use strict';

// 1. require express and set
const express = require('express');
const app = express();
const router = express.Router();

const bodyParser = require('body-parser');  // require in step one

// body-parser statements
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

// Authentication
const session = require('express-session');

// use Session for tracking logins
app.use(session({
  secret: "he likes it, hey Mikey!",
  resave: true,
  saveUninitialized: false
}));

app.use(function(req, res, next){
  res.locals.currentUser = req.session.userId;
  next();
});

// 2. set view engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// 3. set router
app.use('/', router);

// 4. include routes
const routes = require('./routes');
app.use('/', routes);

// 5. Serve
//app.listen(3000, ()=>{
  //console.log('\n Server running on port 3000...');
//});

// 5. Serve
let port = process.env.PORT;
if (port == null || port == ""){
  port = 3000;
}
app.listen(port);

// 6. Set public folder for css/img/js
app.use(express.static('public'));

// 7. Require MongoDB/mongoose schemas and models
const mongoose = require('mongoose');
const User = require('./models.js').User;
const Sale = require('./models.js').Sale;

// 8. Link MongoDB Connection
mongoose.connect('mongodb://localhost:27017/yardsalehound', {useNewUrlParser: true, 'useCreateIndex': true});
const db = mongoose.connection;

  // Throw Error if connection is unsuccesful
  db.on('error', (err)=>{
    console.error('\nThere was a connection error: ', err);
  });

  db.once('open', (err)=>{
    console.log('\nDatabase connection successful...');
  });

// 9. Add Error handlers
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  // define as the last app.use callback
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    return res.render('error', {
      message: err.message,
      error: {}
    });
  });


// body-parser statements
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
