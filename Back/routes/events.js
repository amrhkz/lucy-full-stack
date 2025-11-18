const express = require("express");
const authMiddleware = require("../middlewares/auth");
const { getEvents, updateEvent } = require("../controllers/eventController");
const router = express.Router();

router.use(authMiddleware);

router.get("/", getEvents);
router.put("/:id", updateEvent);






module.exports = router;