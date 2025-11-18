const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  repeat: { type: String, required: true }, // "daily", "week-days", "specific-days"
  specificDays: { type: [Number], default: [] },
  dates: { type: [Date], default: [] },
  multiDates: {
    type: [
      {
        date: { type: Date, required: true },
        index: { type: Number, required: true },
      },
    ],
    default: [],
  },
  target: { type: Number },
  habitType: {
    type: String,
    enum: ["simple", "multi"],
    default: "simple",
  },
  count: { type: Number },
  doneCount: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["not-done", "done"],
    default: "not-done",
  },
  startDate: { type: [Date], default: [] },
  customDate: { type: Date, default: null }, // ✅ جدید برای عادت در تاریخ خاص
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
