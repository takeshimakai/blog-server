const { body, validationResult } = require('express-validator');

const Post = require('../models/post');

exports.getAllPosts = (req, res, next) => {
  Post.find({}, (err, posts) => {
    if (err) return next(err);
    res.send(posts);
  });
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) return next(err);
    res.send('Get post');
  });
};

exports.createPost = [
  body('title')
  .trim()
  .notEmpty()
  .withMessage('Please enter title.')
  .escape(),

  body('content')
  .trim()
  .notEmpty()
  .withMessage('Please enter content.')
  .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send(errors);
    } else {
      new Post({
        title: req.body.title,
        content: req.body.content,
        published: req.body.published,
        datePublished: req.body.published ? Date.now() : null
      }).save(err => {
        if (err) {
          next(err);
        }
      })
    }
  }
];

exports.deletePost = (req, res, next) => {
  Post.findByIdAndDelete(req.params.postId, (err) => {
    if (err) return next(err);
    res.redirect('/posts');
  })
};