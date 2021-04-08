const express = require('express');

const postsController = require('../controllers/postsController');

const router = express.Router();

// GET all posts
router.get('/', postsController.getAllPosts);

// GET post by ID
router.get('/:postid', postsController.getPost);

module.exports = router;