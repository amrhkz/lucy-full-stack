const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
