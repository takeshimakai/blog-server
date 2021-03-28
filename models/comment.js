const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  username: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  comment: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);