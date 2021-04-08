const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// POST sign up form
router.post('/signup', userController.postSignUpForm);

// POST login form
router.post('/login', userController.postLogin);

module.exports = router;