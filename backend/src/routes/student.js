const express = require('express');
const { getStudentStats, logStudyTime, updateCourseProgress } = require('../controllers/studentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/stats')
    .get(protect, getStudentStats);

router.route('/log-time')
    .post(protect, logStudyTime);

router.route('/course/:courseId/progress')
    .put(protect, updateCourseProgress);

module.exports = router;
