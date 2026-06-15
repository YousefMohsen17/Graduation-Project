const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const admin = require("../config/firebaseAdmin"); // ← just import, no init

// initialize firebase admin (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

// exports.socialLoginCallback = async (req, res) => {
//   try {
//     const { token } = req.body;

//     // 1. Verify Firebase token
//     const decoded = await admin.auth().verifyIdToken(token);

//     // 2. Find or create user in your DB
//     let user = await Student.findOne({ email: decoded.email });
//     if (!user) {
//       user = await Student.create({
//         email: decoded.email,
//         name: decoded.name || decoded.email,
//         password: Math.random().toString(36), // random password for social users
//       });
//     }

//     // 3. Issue your own JWT
//     const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "30d",
//     });

//     // 4. Send as HttpOnly cookie
//     res.cookie("token", jwtToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 30 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.log("social login error:", error);
//     res.status(401).json({ success: false, error: "Invalid token" });
//   }
// };
exports.socialLoginCallback = async (req, res) => {
  console.log("✅ social route hit");
  console.log("token exists:", !!req.body.token);

  try {
    const { token } = req.body;
    const decoded = await admin.auth().verifyIdToken(token);
    console.log("✅ firebase verified:", decoded.email);

    let user = await Student.findOne({ email: decoded.email });
    console.log("user found:", !!user);

    if (!user) {
      user = await Student.create({
        email: decoded.email,
        name: decoded.name || decoded.email,
        password: Math.random().toString(36),
      });
      console.log("✅ new user created");
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("❌ error:", error.message);
    res.status(401).json({ success: false, error: "Invalid token" });
  }
};
