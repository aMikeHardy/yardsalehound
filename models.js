'use strict';

// 1. Require Mongoose
const mongoose = require('mongoose');

// 5. require for Hashing password
const bcrypt = require('bcrypt');

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
    type: String,
    //required: [true, 'Please enter a date']
  },
  dateString: {
    type: String
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

// 6. Hash password before saving to DB
UserSchema.pre('save', function(next){
  const user = this;
  bcrypt.hash(user.password, 10, function(err, hash){
    if(err){
      return next(err);
    }
    user.password = hash;
    next();
  });
});

// 3. Create the Models
const User = mongoose.model("User", UserSchema);
const Sale = mongoose.model("Sale", SaleSchema);

// 4. Export
module.exports.User = User;
module.exports.Sale = Sale;
