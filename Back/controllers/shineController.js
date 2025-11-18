const Shine = require("../models/shine");

// 🟢 دریافت شاین‌های مخصوص یوزر لاگین‌شده
exports.getShine = async (req, res) => {
  try {
    const shines = await Shine.find({ user: req.user.id }); // 👈 فقط شاین‌های خود کاربر
    res.json(shines);
  } catch (err) {
    res.status(500).json({ error: "Failed to get shine" });
  }
};

// 🟢 آپدیت شاین (فقط اگر برای همان یوزر باشد)
exports.updateShine = async (req, res) => {
  const { id } = req.params;
  const { progress } = req.body;

  try {
    const shine = await Shine.findOne({ _id: id, user: req.user.id }); // 👈 چک کن مال همین یوزر باشه
    if (!shine) return res.status(404).json({ error: "Shine not found" });

    let newStatus = "ongoing";
    let doneAt = shine.doneAt;

    if (progress === shine.target) {
      newStatus = "done";
      if (!shine.doneAt) doneAt = new Date();
    } else {
      doneAt = null;
    }

    const updated = await Shine.findByIdAndUpdate(
      id,
      { progress, status: newStatus, doneAt },
      { new: true }
    );

    console.log("✅ Shine updated:", updated);
    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating shine:", err);
    res.status(500).json({ error: "Error Updating Shine!" });
  }
};

// 🟢 آرشیو کردن شاین (فقط برای شاین‌های خود کاربر)
exports.archiveShine = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Shine.findOneAndUpdate(
      { _id: id, user: req.user.id }, // 👈 فقط برای شاین خود یوزر
      { status: "archived" },
      { new: true, runValidators: false }
    );

    if (!updated) return res.status(404).json({ error: "Shine not found" });

    console.log("📦 Shine archived:", updated);
    res.json(updated);
  } catch (err) {
    console.error("❌ Error archiving shine:", err);
    res.status(500).json({ error: "Error archiving shine!" });
  }
};
