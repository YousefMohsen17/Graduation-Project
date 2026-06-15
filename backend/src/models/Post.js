const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student',
        required: true
    },
    content: {
        type: String,
        required: [true, 'Please add some text content'],
    },
    image: {
        type: String,
        required: false
    },
    likes: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'Student'
        }
    }],
    comments: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'Student',
            required: true
        },

        text: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', PostSchema);
