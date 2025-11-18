const express = require("express");
const router = express.Router();
const {
  getGoals,
  createGoal,
  getGoalTree,
  deleteGoal,
  updateGoal,
  getGoalBySlug,
  reorderGoal,
  liftGoal,
  sinkGoal,
  toggleGoal,
  toggleCollapse,
  swapMindOrder,
} = require("../controllers/goalController");
const authMiddleware = require("../middlewares/auth");

router.use(authMiddleware);

router.get("/", getGoals);
router.post("/", createGoal);
router.get("/tree", getGoalTree);
router.delete("/:id", deleteGoal);
router.put("/:id", updateGoal);
router.patch("/swap-mindorder", swapMindOrder);
router.get("/:slug", getGoalBySlug);
router.put("/:id/order", reorderGoal);
router.put("/:id/lift", liftGoal);
router.put("/:id/sink", sinkGoal);
router.patch("/:id/toggle", toggleGoal);
router.put("/:id/collapse", toggleCollapse);






module.exports = router;
