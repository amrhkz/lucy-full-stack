const Message = require("../models/message");

// 🟢 دریافت همه پیام‌ها (بر اساس ایمیل‌ها)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "خطا در دریافت پیام‌ها", error });
  }
};

// 🟡 ارسال پیام جدید با ایمیل احراز شده
exports.sendMessage = async (req, res) => {
  try {
    // ⚡ ایمیل کاربر از middleware احراز هویت
    const email = req.user?.email;
    if (!email) return res.status(401).json({ message: "Unauthorized" });

    const { text, avatar } = req.body;

    if (!text) {
      return res.status(400).json({ message: "پیام خالی است" });
    }

    // ⚡ sender رو بر اساس ایمیل مشخص می‌کنیم
    let sender = "user";
    if (email === "amrhkz@outlook.com") sender = "me";
    if (email === "sadeghian.marjan13@gmail.com") sender = "user";

    const newMessage = await Message.create({
      sender,
      email,
      text,
      avatar: avatar || (sender === "me" ? "/img/amrhkz.png" : "/img/marjan.png"),
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "خطا در ارسال پیام", error });
  }
};
