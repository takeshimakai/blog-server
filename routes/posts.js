const express = require('express');
const passport = require('passport');

const postsController = require('../controllers/postsController');
const commentsController = require('../controllers/commentsController');

const router = express.Router();

// GET all posts
router.get('/', postsController.getAllPosts);

// GET post by ID
router.get('/:postid', postsController.getPost);

// POST comment
router.post('/:postid/comments', passport.authenticate('jwt-user', { session: false }), commentsController.createComment);

module.exports = router;