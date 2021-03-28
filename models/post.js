const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  pushlished: { type: Boolean, required: true },
  datePublished: Date
});

module.exports = mongoose.model('Post', PostSchema);