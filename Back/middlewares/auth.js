const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "default_secret";

function authMiddleware(req, res, next) {
  console.log("🧩 AuthMiddleware triggered for:", req.path);
  const { token } = req.cookies;
  console.log("token:", token);
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, jwtSecret, {}, (err, userData) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = userData; // 👈 اطلاعات کاربر (id, email, name)
    next();
  });
}

module.exports = authMiddleware;
