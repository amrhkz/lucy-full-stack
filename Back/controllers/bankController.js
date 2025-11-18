const Card = require("../models/bankCard");

exports.getBanks = async (req, res) => {
  try {
    const banks = await Card.find({ user: req.user.id }); // فقط کارت‌های همین کاربر
    res.json(banks);
  } catch (err) {
    res.status(500).json({ error: "Failed to get Bank Cards" });
  }
};

// 🟢 ساخت کارت جدید برای کاربر
exports.createBank = async (req, res) => {
  try {
    const { bank, cardNum, owner, cvv, expiry, iban, balance } = req.body;

    const newCardData = {
      user: req.user.id, // 👈 اتصال به کاربر
      bank,
      cardNum,
      owner,
      cvv,
      expiry,
      iban,
      balance,
    };

    const card = await Card.create(newCardData);

    console.log("✅ Bank Card Created:", card);

    res.json(card);
  } catch (err) {
    console.error("Error Creating Bank Card:", err);
    res.status(500).json({ error: "Failed to Create Bank Card!" });
  }
};

// 🟡 ویرایش کارت فقط اگر متعلق به کاربر باشه
exports.updateBank = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const card = await Card.findOneAndUpdate(
      { _id: id, user: req.user.id }, // 👈 فقط کارت‌های خود کاربر
      update,
      { new: true }
    );

    if (!card) {
      return res.status(404).json({ error: "Card not found or not yours" });
    }

    console.log("✅ Bank Card Updated:", card);
    res.json(card);
  } catch (err) {
    console.error("Error updating bank:", err);
    res.status(500).json({ error: "Failed to update bank" });
  }
};

// 🔴 حذف کارت فقط اگر برای همین کاربر باشه
exports.deleteBank = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Card.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!deleted)
      return res.status(404).json({ error: "Card not found or not yours" });

    console.log("🗑️ Deleted Card:", deleted);
    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    console.error("Error deleting bank:", err);
    res.status(500).json({ error: "Failed to delete bank" });
  }
};
