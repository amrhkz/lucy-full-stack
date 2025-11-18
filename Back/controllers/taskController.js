const Task = require("../models/task");

// گرفتن همه تسک‌ها
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ order: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to get tasks" });
  }
};

// ایجاد تسک
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      status: req.body.status || "todo",
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

// ویرایش تسک
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Task not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

// حذف تسک
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};

// تغییر وضعیت تسک (toggle)
exports.toggleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.done = task.done === "done" ? "todo" : "done";
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to toggle task" });
  }
};

// تغییر ترتیب تسک‌ها
exports.reorderTasks = async (req, res) => {
  try {
    const updates = req.body.tasks;
    for (const { _id, order } of updates) {
      await Task.findByIdAndUpdate(_id, { order });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to reorder tasks" });
  }
};
