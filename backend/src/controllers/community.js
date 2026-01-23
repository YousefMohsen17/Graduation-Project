const Post = require('../models/Post');
const Student = require('../models/Student');

// @desc    Get all posts
// @route   GET /api/community
// @access  Private
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json({ success: true, count: posts.length, data: posts });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create a post
// @route   POST /api/community
// @access  Private
exports.createPost = async (req, res) => {
    try {
        const newPost = new Post({
            content: req.body.content,
            user: req.user.id
        });

        const post = await newPost.save();
        res.json({ success: true, data: post });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Like a post
// @route   PUT /api/community/like/:id
// @access  Private
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ success: false, error: 'Post already liked' });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json({ success: true, data: post.likes });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Comment on a post
// @route   POST /api/community/comment/:id
// @access  Private
exports.commentOnPost = async (req, res) => {
    try {
        const user = await Student.findById(req.user.id);
        const post = await Post.findById(req.params.id);

        const newComment = {
            content: req.body.content, // Changed from text to content to match request usually, but let's check schema
            text: req.body.text,
            name: user.name,
            avatar: user.avatar, // Assuming avatar might exist later, or undefined
            user: req.user.id
        };

        post.comments.unshift(newComment);

        await post.save();

        res.json({ success: true, data: post.comments });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
