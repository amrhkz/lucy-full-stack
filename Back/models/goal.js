const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  prog: {
    type: Number,
  },
  desc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  mainGoal: { type: Boolean, default: false },

  lastSub: {
    type: String,
  },
  order: {
    type: Number,
  },
  mindOrder: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["todo", "done"],
    default: "todo",
  },
  collapsed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
