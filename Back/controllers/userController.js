const User = require("../models/user");

// گرفتن اطلاعات کاربر
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Failed to get user" });
  }
};

// آپدیت آواتار کاربر
exports.updateUserAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const { avatar } = req.body; // مثلاً لینک عکس ذخیره‌شده در /uploads/

    if (!avatar) return res.status(400).json({ error: "No avatar provided" });

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    console.log("✅ Avatar updated for user:", updatedUser.email);

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating avatar:", err);
    res.status(500).json({ error: "Failed to update avatar" });
  }
};
