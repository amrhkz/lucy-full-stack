const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
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
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["ongoing", "done", "archived"],
    default: "not-active",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
