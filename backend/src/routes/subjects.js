const express = require('express');
const { getSubjects, createSubject, getSubject, enrollCourse, getEnrolledCourses } = require('../controllers/subjectController');
const { protect, authorize } = require('../middleware/auth');

// Include other resource routers
const lectureRouter = require('./lectures');

const router = express.Router();

// Re-route into other resource routers
router.use('/:subjectId/lectures', lectureRouter);

router.route('/')
    .get(getSubjects)
    .post(protect, authorize('admin'), createSubject); // Protected create route

router.route('/enrolled').get(protect, getEnrolledCourses);

router.route('/:id')
    .get(getSubject);

router.route('/:id/enroll').post(protect, enrollCourse);

module.exports = router;
