const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const passport = require('passport'); // Import passport
const connectDB = require('./config/db');
const cors = require("cors");

// Load env vars
dotenv.config();

// Passport config
require('./config/passport')(passport); // Config passport

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(helmet());
app.use(passport.initialize()); // Init passport middleware

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/lectures', require('./routes/lectures'));

app.use('/api/subjects', require('./routes/subjects'));
app.use('/api/community', require('./routes/community'));

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
