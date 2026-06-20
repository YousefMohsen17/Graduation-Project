const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Ensure upload directory exists
const fs = require("fs");
const uploadDir = path.join(__dirname, "../uploads/posts");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const app = express();
app.set("trust proxy", 1); // Trust first proxy (Railway)

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://graduation-project-p8w4.vercel.app",
      ];

      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// ✅ handle preflight requests correctly
app.options("*", cors());

// Body parser
app.use(express.json());
app.use(cookieParser());

// Helmet config (after CORS)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false, // disable CSP for testing
    crossOriginEmbedderPolicy: false, // disable COEP for testing
  }),
);

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Mount routers
app.use("/api/auth", require("./routes/auth"));
app.use("/api/lectures", require("./routes/lectures"));
app.use("/api/subjects", require("./routes/subjects"));
app.use("/api/community", require("./routes/community"));
app.use("/api/student", require("./routes/student"));
app.use("/api/ai", require("./routes/ai"));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
