const express = require("express");
const { getHabits, updateHabit, createHabit, deleteHabit } = require("../controllers/habbitController");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

router.use(authMiddleware);

router.get("/", getHabits);
router.post("/", createHabit);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);





module.exports = router;