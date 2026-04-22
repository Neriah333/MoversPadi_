const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // 👈 contains role now

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};