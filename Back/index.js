const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

mongoose
  .connect("mongodb://localhost:27017/mindmap_local")
  // .connect("mongodb+srv://mindmap:1x1XuZZyRIui48Ei@cluster0.g6szs76.mongodb.net/mindmap?appName=Cluster0")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

app.use("/auth", require("./routes/auth"));
app.use("/goals", require("./routes/goals"));
app.use("/tasks", require("./routes/tasks"));
app.use("/shines", require("./routes/shines"));
app.use("/banks", require("./routes/banks"));
app.use("/habits", require("./routes/habits"));
app.use("/moneys", require("./routes/moneys"));
app.use("/events", require("./routes/events"))
app.use("/messages", require("./routes/messages"))
app.use("/products", require("./routes/product"))

const uploadRoute = require("./routes/upload");
app.use("/api/upload", uploadRoute);
app.use("/uploads", express.static("uploads"));
app.use("/api/user", require("./routes/user"));



app.listen(4000, () =>
  console.log("🚀 Server running on http://localhost:4000")
);
