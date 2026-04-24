const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const admin = require("../config/firebaseAdmin");

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ success: false, error: "Not authorized" });
  }

  // First try your own JWT (email/password login)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Student.findById(decoded.id);
    return next();
  } catch (err) {
    // If JWT fails, try Firebase token (Google/Facebook login)
    try {
      const decoded = await admin.auth().verifyIdToken(token);
      req.user = await Student.findOne({ email: decoded.email });
      return next();
    } catch {
      return res.status(401).json({ success: false, error: "Not authorized" });
    }
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized`,
      });
    }
    next();
  };
};
