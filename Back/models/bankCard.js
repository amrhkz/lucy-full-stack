const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  bank: {
    type: String,
  },
  cardNum: {
    type: String,
  },
  owner: {
    type: String,
  },
  cvv: {
    type: Number,
  },
  expiry: {
    type: String,
  },
  iban: {
    type: String,
  },
  balance: {
    type: Number,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
