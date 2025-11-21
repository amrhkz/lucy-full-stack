const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
  price: { type: Number, required: true },
  image: { type: String, required: false },
  slug: { type: String, unique: true, default: () => Date.now().toString() },
  status: {
    type: String,
    enum: ["all", "done", "ongoing", "archived"],
    default: "ongoing",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
