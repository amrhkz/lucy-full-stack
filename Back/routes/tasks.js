const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
  reorderTasks,
} = require("../controllers/taskController");

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

// جدید
router.patch("/:id/toggle", toggleTask);
router.patch("/reorder", reorderTasks);

module.exports = router;
