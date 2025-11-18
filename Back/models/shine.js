const mongoose = require("mongoose");

const shineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  progress: {
    type: Number,
  },
  target: {
    type: Number,
  },
  img: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["ongoing", "done", "archived"],
    default: "not-active",
  },
  doneAt: {
    type: Date,
    default: null,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Shine = mongoose.model("Shine", shineSchema);

module.exports = Shine;
