// routes/upload.js
const express = require("express");
const { uploadMiddleware, handleUpload } = require("../controllers/uploadController");

const router = express.Router();

// مسیر POST برای آپلود فایل
router.post("/", uploadMiddleware, handleUpload);

module.exports = router;
