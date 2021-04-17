const express = require('express');
const passport = require('passport');

const commentsController = require('../controllers/commentsController');

const router = express.Router();

// GET comments of post
router.get('/:postId/', commentsController.getComments);

// POST create comment
router.post('/:postId/', passport.authenticate('jwt-user', { session: false }), commentsController.createComment);

// DELETE comment
router.delete('/:postId/:commentId', passport.authenticate('jwt-admin', { session: false }), commentsController.deleteComment);

module.exports = router;