const { body, validationResult } = require('express-validator');

const Comment = require('../models/comment');

exports.getComments = (req, res, next) => {
  Comment.find({ 'post': req.params.id }, (err, comments) => {
    if (err) return next(err);
    res.send(comments);
  })
};

exports.createComment = [
  body('comment')
  .trim()
  .notEmpty()
  .withMessage('Please add comment.')
  .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send(errors);
    } else {
      new Comment({
        username: req.body.username,
        post: req.params.id,
        comment: req.body.comment
      }).save(err => {
        if (err) return next(err);
      })
    }
  }
];