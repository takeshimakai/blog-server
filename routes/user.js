const express = require('express');
const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/userController');

// POST sign up form
router.post('/signup', userController.postSignUpForm);

// POST login form
router.post('/login', userController.postLogin);

// Verify token
router.get('/verifytoken', passport.authenticate('jwt-user', { session: false }), (req, res) => res.sendStatus(200));

module.exports = router;