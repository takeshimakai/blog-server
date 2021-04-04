const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user');

exports.getAdminProfile = (req, res, next) => {
  User.findOne({ isAdmin: true }, (err, admin) => {
    if (err) {
      next(err);
    };
    res.send(admin);
  });
};

exports.postSignUpForm = [
  body('email')
  .trim()
  .notEmpty()
  .withMessage('Email must be specified')
  .toLowerCase()
  .isEmail()
  .withMessage('Please enter a valid email')
  .custom(value => {
    return User.findOne({ email: value }).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      };
    });
  }),

  body('password')
  .trim()
  .notEmpty()
  .withMessage('Password must be specified'),

  body('username')
  .trim()
  .notEmpty()
  .withMessage('Username must be specified')
  .isAlphanumeric()
  .withMessage('Username must consist of letters and numbers')
  .custom(value => {
    return User.findOne({ username: value }).then(user => {
      if (user) {
        return Promise.reject('Username already taken');
      };
    });
  }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send(errors);
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPw) => {
        if (err) {
          next(err)
        } else {
          new User({
            email: req.body.email,
            password: hashedPw,
            username: req.body.username,
            isAdmin: false
          }).save(err => {
            if (err) {
              next(err);
            }
          });
        };
      });
    };
  }
];