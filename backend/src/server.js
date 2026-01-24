const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const passport = require('passport');
const connectDB = require('./config/db');
const cors = require("cors");

// Load env vars
dotenv.config();

// Passport config
require('./config/passport')(passport);

// Connect to database
connectDB();

const app = express();
// 1. MUST BE FIRST: Define Origins
const allowedOrigins = [
    "http://localhost:5173",
    "https://graduation-project-9ic7.vercel.app",
    process.env.CLIENT_URL
].filter(Boolean);

// 2. MUST BE SECOND: CORS Configuration
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS not allowed"));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.get('/', (req, res) => {
    res.send('API is running...');
});

// Middleware
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());





app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(passport.initialize());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/lectures', require('./routes/lectures'));

app.use('/api/subjects', require('./routes/subjects'));
app.use('/api/subjects', require('./routes/subjects'));
app.use('/api/community', require('./routes/community'));
app.use('/api/student', require('./routes/student'));

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from frontend build
    app.use(express.static(path.join(__dirname, '../../frontend/dist')));

    // Handle React routing - return index.html for all non-API routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
    });
}

// For Vercel serverless
module.exports = app;

// Only start server if not in serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    const PORT = process.env.PORT || 5000;

    const server = app.listen(
        PORT,
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err, promise) => {
        console.log(`Error: ${err.message}`);
        server.close(() => process.exit(1));
    });
}
