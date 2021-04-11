const express = require('express');

const router = express.Router();

const adminController = require('../controllers/adminController');

// POST create post
router.post('/posts', adminController.createPost);

// DELETE post
router.delete('/posts/:postId', adminController.deletePost);

module.exports = router;