'use strict';

// 1. Require Mongoose
const mongoose = require('mongoose');

// 2. Define Mongoose Schemas
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const SaleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    required: [true, 'Please enter a date']
  },
  start: {
    type: String,
    required: true
  },
  end: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
});

// 3. Create the Models
const User = mongoose.model("User", UserSchema);
const Sale = mongoose.model("Sale", SaleSchema);

// 4. Export
module.exports.User = User;
module.exports.Sale = Sale;
