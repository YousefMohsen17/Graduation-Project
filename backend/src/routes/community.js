const express = require('express');
const router = express.Router();
const { getPosts, createPost, likePost, commentOnPost, deletePost, getUserPosts } = require('../controllers/community');
const { protect } = require('../middleware/auth');
const upload = require('../config/multer');

router.route('/')
    .get(protect, getPosts)
    .post(protect, upload.single("image"), createPost);

router.route('/user/:id').get(protect, getUserPosts);

router.route('/:id').delete(protect, deletePost);

router.route('/like/:id').put(protect, likePost);
router.route('/comment/:id').post(protect, commentOnPost);

module.exports = router;
