const { body, validationResult } = require('express-validator');

const Comment = require('../models/comment');

// Get comments
exports.getComments = (req, res, next) => {
  Comment
  .find({ post: req.params.postId })
  .populate('user', 'username')
  .exec((err, comments) => {
    if (err) return next(err);
    res.json(comments);
  })
};

// Create comment
exports.createComment = [
  body('comment')
  .trim()
  .notEmpty()
  .withMessage('Please add comment.')
  .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    } else {
      new Comment({
        user: req.body.user,
        post: req.params.postId,
        comment: req.body.comment
      }).save(err => {
        if (err) return next(err);
        res.sendStatus(200);
      })
    }
  }
];

// Delete comment
exports.deleteComment = (req, res, next) => {
  Comment.findByIdAndDelete(req.params.commentId, (err) => {
    if (err) return next(err);
    res.sendStatus(200);
  })
}