const express = require("express");
const authMiddleware = require("../middlewares/auth");
const { getMessages, sendMessage } = require("../controllers/messageController");
const router = express.Router();

router.use(authMiddleware);

router.get("/", getMessages);
router.post("/", sendMessage);

module.exports = router;