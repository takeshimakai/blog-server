const { body, validationResult } = require('express-validator');

const Post = require('../models/post');
const Comment = require('../models/comment');

// Get posts
exports.getAllPosts = async (req, res, next) => {
  Post.find({}, (err, posts) => {
    if (err) return next(err);
    res.json(posts);
  });
};

// Get single post with its comments
exports.getPost = (req, res, next) => {
  Promise.all([
    Post.findById(req.params.postId),
    Comment.find({ 'post': req.params.postId }).populate('user', 'username')
  ])
  .then(([post, comments]) => {
    res.json({ post, comments });
  })
  .catch(err => next(err));
};

// Create post
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
      res.status(400).json(errors);
    } else {
      new Post({
        title: req.body.title,
        content: req.body.content,
        published: req.body.published,
        datePublished: req.body.published ? Date.now() : null,
        dateCreated: Date.now()
      }).save(err => {
        if (err) {
          next(err);
        }
        res.sendStatus(200);
      })
    }
  }
];

// Edit post
exports.updatePost = [
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
      res.status(400).json(errors);
    } else {
      const editedPost = new Post({
        _id: req.params.postId,
        title: req.body.title,
        content: req.body.content,
        published: req.body.published,
        datePublished: req.body.published ? Date.now() : null
      });

      Post.findByIdAndUpdate(req.params.postId, editedPost, (err) => {
        if (err) return next(err);
        res.sendStatus(200);
      })
    }
  }
]

// Delete post and its comments
exports.deletePost = (req, res, next) => {
  Promise.all([
    Post.findByIdAndDelete(req.params.postId),
    Comment.deleteMany({ 'post': req.params.postId })
  ])
  .then(res.sendStatus(200))
  .catch(err => next(err));
};