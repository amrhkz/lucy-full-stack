const Product = require("../models/product");

exports.getProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const products = await Product.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Problem fetching products" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { title, price, desc } = req.body;
    const image = req.file ? "/uploads/" + req.file.filename : null;
    const userId = req.user.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const product = await Product.create({
      title,
      price,
      desc,
      image,
      user: userId,
    });
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Problem creating product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const userId = req.user.id;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.user.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    // انجام آپدیت
    product.title = req.body.title ?? product.title;
    product.desc = req.body.desc ?? product.desc;
    product.price = req.body.price ?? product.price;

    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const userId = req.user.id;

    const product = await Product.findById(req.params.id);

    // محصول پیدا نشد
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // محصول برای این یوزر نیست
    if (product.user.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    await product.deleteOne();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
