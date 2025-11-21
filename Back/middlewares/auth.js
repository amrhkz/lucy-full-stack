const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "default_secret";

function authMiddleware(req, res, next) {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  jwt.verify(token, jwtSecret, {}, (err, userData) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = userData;
    next();
  });
}

module.exports = authMiddleware;
