const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  avatar: { type: String, default: null },
  banner: { type: String, default: null },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
