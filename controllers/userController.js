const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user');

exports.getAdminProfile = (req, res, next) => {
  User.findOne({ isAdmin: true }, (err, admin) => {
    if (err) return next(err);
    res.send(admin);
  });
};

exports.postSignUpForm = (req, res, next) => {
  new User({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    isAdmin: false
  }).save();
};