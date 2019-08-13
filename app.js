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

// Serve
let port = process.env.PORT;
if (port == null || port == ""){
  port = 3000;
}
app.listen(port);

// 6. Set public folder for css/img/js
app.use(express.static('public'));
