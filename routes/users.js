const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', (req, res) => res.redirect('/users/profile'));

// GET profile
router.get('/profile', userController.getAdminProfile);

// GET profile edit form
router.get('/profile/edit', (req, res) => res.send('Profile edit'));

// POST profile edit form
router.post('/profile/edit', (req, res) => res.send('POST profile edit'));

// GET user profile by id
router.get('/profile/:userid', (req, res) => res.send('Profile by ID'));

module.exports = router;