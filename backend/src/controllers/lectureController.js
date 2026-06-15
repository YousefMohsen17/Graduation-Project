const Lecture = require('../models/Lecture');
const Subject = require('../models/Subject');

// @desc    Get lectures
// @route   GET /api/lectures
// @route   GET /api/subjects/:subjectId/lectures
// @access  Public
exports.getLectures = async (req, res) => {
    try {
        let query;

        if (req.params.subjectId) {
            query = Lecture.find({ subject: req.params.subjectId });
        } else {
            query = Lecture.find().populate({
                path: 'subject',
                select: 'name code'
            });
        }

        const lectures = await query;

        res.status(200).json({
            success: true,
            count: lectures.length,
            data: lectures
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Add lecture
// @route   POST /api/lectures
// @access  Private
exports.addLecture = async (req, res) => {
    try {
        // Manually add subjectId to body if not present but passed in params (if we restructure routes later)
        // For now assuming subjectId is in body

        // Check if subject exists
        const subject = await Subject.findById(req.body.subject);
        if (!subject) {
            return res.status(404).json({ success: false, error: 'No subject found with the id of ' + req.body.subject });
        }

        const lecture = await Lecture.create(req.body);

        res.status(200).json({
            success: true,
            data: lecture
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
