'use strict';

// 1. require express and set
const express = require('express');
const app = express();
const router = express.Router();

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

//
