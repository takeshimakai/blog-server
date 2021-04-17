const express = require('express');
const passport = require('passport');

const postsController = require('../controllers/postsController');

const router = express.Router();

// GET all posts
router.get('/', postsController.getAllPosts);

// POST create post
router.post('/', passport.authenticate('jwt-admin', { session: false }), postsController.createPost);

// GET post by ID
router.get('/:postId', postsController.getPost);

// UPDATE post
router.put('/:postId', passport.authenticate('jwt-admin', { session: false }), postsController.updatePost);

// DELETE post
router.delete('/:postId', passport.authenticate('jwt-admin', { session: false }), postsController.deletePost);

module.exports = router;