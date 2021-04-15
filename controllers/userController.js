require('dotenv').config();

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

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
      res.json(errors);
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPw) => {
        if (err) {
          next(err)
        } else {
          new User({
            email: req.body.email,
            password: hashedPw,
            username: req.body.username,
            isAdmin: req.body.isAdmin === 'true' ? true : false
          }).save(err => {
            if (err) {
              next(err);
            }
            res.sendStatus(200);
          });
        };
      });
    };
  }
];

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json(info);
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }
      jwt.sign({ id: user._id, username: user.username, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: 30 }, (err, token) => {
        res.json({ token, isAdmin: user.isAdmin });
      });
    })
  })(req, res);
};