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

const app = express();

// CORS Configuration - MUST BE FIRST
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://graduation-project-9ic7.vercel.app"
    ],
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
    crossOriginResourcePolicy: { policy: "cross-origin" }
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
