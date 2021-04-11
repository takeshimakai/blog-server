const express = require('express');
const passport = require('passport');

const postsController = require('../controllers/postsController');
const commentsController = require('../controllers/commentsController');

const router = express.Router();

// GET all posts
router.get('/', postsController.getAllPosts);

// POST create post
router.post('/', passport.authenticate('jwt-admin', { session: false }), postsController.createPost);

// GET post by ID
router.get('/:postid', postsController.getPost);

// DELETE post
router.delete('/:postId', passport.authenticate('jwt-admin', { session: false }), postsController.deletePost);

// POST comment
router.post('/:postid/comments', passport.authenticate('jwt-user', { session: false }), commentsController.createComment);

module.exports = router;