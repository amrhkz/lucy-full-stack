const mongoose = require("mongoose");

const moneySchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
  },
  currentMoney: {
    type: Number,
  },
  targetMoney: {
    type: Number,
  },
  financeTask: {
    type: [
      {
        index: { type: Number, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        type: { type: String, required: true },
        done: {
          type: String,
          required: true,
          enum: ["Done", "Not Done", "Archived"],
          default: "Not Done",
        },
      },
    ],
    default: [],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Money = mongoose.model("Money", moneySchema);

module.exports = Money;
