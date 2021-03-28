const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.redirect('/users/profile'));

// GET user profile
router.get('/profile', (req, res) => res.send('User profile'));

// GET user profile by id
router.get('/profile/:userid', (req, res) => res.send('Profile by ID'));

module.exports = router;