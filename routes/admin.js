const express = require('express');

const router = express.Router();

const adminController = require('../controllers/adminController');

// POST create post
router.post('/new-post', adminController.createPost);

module.exports = router;