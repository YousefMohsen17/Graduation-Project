const express = require("express");
// const passport = require("passport");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  getMe,
  updateDetails,
  updatePassword,
  logout,
} = require("../controllers/auth");
const { socialLoginCallback } = require("../controllers/socialAuth");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);

router.get("/me", protect, getMe);
router.put("/updatedetails", protect, updateDetails);
router.put("/updatepassword", protect, updatePassword);

// add this line
router.post("/social", socialLoginCallback);

// // Google Auth
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] }),
// );
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   socialLoginCallback,
// );

// // Facebook Auth
// router.get(
//   "/facebook",
//   passport.authenticate("facebook", { scope: ["email"] }),
// );
// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", { failureRedirect: "/login" }),
//   socialLoginCallback,
// );

module.exports = router;
