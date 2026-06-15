const express = require('express');
const { getLectures, addLecture } = require('../controllers/lectureController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.route('/')
    .get(getLectures)
    .post(protect, authorize('admin'), addLecture);

module.exports = router;
