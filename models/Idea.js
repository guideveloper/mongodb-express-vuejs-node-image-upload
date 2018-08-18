var mongoose = require('mongoose');

var IdeaSchema = new mongoose.Schema({
  tags: Array,
  title: String,
  name: String,
  description: String,
  updated_date: { type: Date, default: Date.now },
  user: String,
  shared_users: [
    {
      userId: String,
      canEdit: Boolean
    }
  ],
  colour: String,
  public: Boolean,
  images: String,
  videos: String
});

module.exports = mongoose.model('Idea', IdeaSchema);
