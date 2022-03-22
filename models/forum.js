var mongoose = require("mongoose");
var ForumSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 10, maxLength: 100 },
  forumBody: { type: String, required: true, minlength: 50, maxLength: 500 },
  author: { type: String, required: true, minlength: 5, maxLength: 50 },
  doc: { type: Date },
});
module.exports = mongoose.model("Forum", ForumSchema);
