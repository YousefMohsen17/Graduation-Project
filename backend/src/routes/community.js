const express = require('express');
const router = express.Router();
const { getPosts, createPost, likePost, commentOnPost } = require('../controllers/community');
const { protect } = require('../middleware/auth');

router.route('/')
    .get(protect, getPosts)
    .post(protect, createPost);

router.route('/like/:id').put(protect, likePost);
router.route('/comment/:id').post(protect, commentOnPost);

module.exports = router;
