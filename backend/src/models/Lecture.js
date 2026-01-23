const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a lecture title'],
        trim: true,
    },
    description: {
        type: String,
    },
    videoUrl: {
        type: String,
        required: [true, 'Please add a video URL'],
    },
    pdfUrl: {
        type: String, // Optional, for lecture notes
    },
    subject: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subject',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Lecture', LectureSchema);
