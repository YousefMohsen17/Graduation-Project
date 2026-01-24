const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    password: {
        type: String,
        required: false, // Changed for social login (optional)
        minlength: 6,
        select: false,
    },
    googleId: String,
    facebookId: String,
    universityId: {
        type: String,
    },
    department: {
        type: String,
    },
    academicYear: {
        type: String,
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student',
    },
    enrolledCourses: [{
        course: {
            type: mongoose.Schema.ObjectId,
            ref: 'Subject'
        },
        progress: {
            type: Number,
            default: 0
        },
        completed: {
            type: Boolean,
            default: false
        },
        enrolledAt: {
            type: Date,
            default: Date.now
        }
    }],
    studyStats: {
        streak: {
            type: Number,
            default: 0
        },
        lastStudyDate: {
            type: Date
        },
        totalStudyMinutes: {
            type: Number,
            default: 0
        },
        dailyActivity: [{
            date: String, // Format YYYY-MM-DD
            minutes: Number
        }]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// Encrypt password using bcrypt
StudentSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    if (this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

// Match user entered password to hashed password in database
StudentSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
StudentSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model('Student', StudentSchema);
