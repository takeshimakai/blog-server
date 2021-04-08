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