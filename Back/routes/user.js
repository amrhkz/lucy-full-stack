const express = require("express");
const { getUser, updateUserAvatar } = require("../controllers/userController");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// server/routes/auth.js
router.get("/me", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
});


router.put("/:id/avatar", updateUserAvatar);

router.put("/:id/banner", async (req, res) => {
  try {
    const { id } = req.params;
    const { banner } = req.body;

    const user = await User.findByIdAndUpdate(id, { banner }, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ success: true, banner: user.banner });
  } catch (err) {
    console.error("Error updating banner:", err);
    res.status(500).json({ error: "Failed to update banner" });
  }
});

module.exports = router;
