const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
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
  parentId: {
    type: String,
  },
  parentSlug: {
    type: String,
  },
  repeat: {
    type: String,
  },
  taskType: {
    type: String,
  },
  done: {
    type: String,
  },
  progress: {
    type: Number,
  },
  target: {
    type: Number,
  },
  order: {
    type: Number,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
