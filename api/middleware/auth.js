const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized to access this route");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized to access this route");
  }
});

const authorize = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.role === "user") {
    res.status(403);
    throw new Error("Not authorized to access this route, Admins only");
  }
  next();
});

module.exports = { protect, authorize };
