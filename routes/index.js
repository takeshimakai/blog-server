const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Homepage
router.get('/', (req, res) => res.redirect('/posts'));

// POST sign up form
router.post('/signup', userController.postSignUpForm);

// POST login form
router.post('/login', userController.postLogin);

// Logout
router.get('/logout', (req, res) => res.send('Logout'));

// GET create post form
router.get('/new-post', (req, res) => res.send('New post'));

// POST create post form
router.post('/new-post', (req, res) => res.send('POST new post form'));

module.exports = router;