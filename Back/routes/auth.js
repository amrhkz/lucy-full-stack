const express = require("express");
const router = express.Router();
const {
  sendCode,
  verifyCode,
  getProfile,
  logout,
} = require("../controllers/authController");

router.post("/send-code", sendCode);
router.post("/verify-code", verifyCode);
router.get("/profile", getProfile);
router.post("/logout", logout);

module.exports = router;
