// controllers/uploadController.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../models/User"); // اگر خواستی در دیتابیس ذخیره کنی

// مسیر ذخیره فایل‌ها
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// تنظیمات Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// کنترلر اصلی
exports.uploadMiddleware = upload.single("file");


exports.handleUpload = async (req, res) => {
  try {
    const fileName = req.file.filename;
    const filePath = `/uploads/${fileName}`;

    // برای تست فرض کن شناسه کاربر از body میاد:
    const { userId } = req.body;

    // ثبت در دیتابیس
    if (userId) {
      await User.findByIdAndUpdate(userId, { avatar: fileName });
    }

    res.json({ success: true, fileName, filePath });
  } catch (err) {
    console.error("❌ Upload Error:", err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};