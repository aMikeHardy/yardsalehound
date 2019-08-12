'use strict';

const express = require('express');
const router = express.Router();

// GET homepage
router.get('/', (req, res)=>{
  return res.send('Hello World!');
});

module.exports = router;
