const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  published: { type: Boolean, required: true },
  datePublished: Date,
  dateCreated: Date,
});

module.exports = mongoose.model('Post', PostSchema);