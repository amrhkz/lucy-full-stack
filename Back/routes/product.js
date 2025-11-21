const express = require("express");
const { createProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/productController");
const { uploadMiddleware } = require("../controllers/uploadController");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

router.use(authMiddleware);

router.post("/", uploadMiddleware, createProduct);
router.get("/", getProducts);
router.put("/:id", uploadMiddleware, updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
