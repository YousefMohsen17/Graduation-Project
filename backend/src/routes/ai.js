const express = require("express");
const router = express.Router();
const { chatWithAI } = require("../controllers/aiController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
router.post("/chat", upload.single("file"), chatWithAI);
module.exports = router;
