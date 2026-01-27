const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const passport = require('passport');
const connectDB = require('./config/db');
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');

// Load env vars
dotenv.config();

// Passport config
require('./config/passport')(passport);

// Connect to database
connectDB();

// Ensure upload directory exists
const fs = require('fs');
const uploadDir = path.join(__dirname, '../uploads/posts');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const app = express();
app.set('trust proxy', 1); // Trust first proxy (Railway)

// CORS Configuration - MUST BE FIRST
const corsOptions = {
    origin: [
        "https://graduation-project-p8w4.vercel.app",
        "http://localhost:5173",
        process.env.CLIENT_URL,
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    optionsSuccessStatus: 200
};

// Apply CORS
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('/^\/.*$/', cors(corsOptions));

// Body parser
app.use(express.json());
app.use(cookieParser());

// Helmet config (after CORS)
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false, // disable CSP for testing
    crossOriginEmbedderPolicy: false // disable COEP for testing
}));

app.use(passport.initialize());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Health check route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Mount routers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/lectures', require('./routes/lectures'));
app.use('/api/subjects', require('./routes/subjects'));
app.use('/api/community', require('./routes/community'));
app.use('/api/student', require('./routes/student'));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
