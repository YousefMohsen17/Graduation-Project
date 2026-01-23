const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a subject name'],
        trim: true,
    },
    code: {
        type: String,
        required: [true, 'Please add a subject code'],
        unique: true,
        uppercase: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    department: {
        type: String,
        required: [true, 'Please add a department'],
    },
    year: {
        type: String, // e.g., "First Year", "Second Year"
        required: [true, 'Please add an academic year'],
    },
    driveLink: {
        type: String,
        required: [true, 'Please add a Google Drive link'],
        match: [
            /https?:\/\/(drive|docs)\.google\.com|youtube\.com/,
            'Please use a valid Google Drive or YouTube link'
        ]
    },
    instructor: {
        type: String,
        required: [true, 'Please add an instructor name'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Subject', SubjectSchema);



