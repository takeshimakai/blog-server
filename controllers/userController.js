const User = require('../models/user');

exports.getAdminProfile = (req, res, next) => {
  User.findOne({ isAdmin: true }, (err, admin) => {
    if (err) return next(err);
    res.send(admin);
  });
};