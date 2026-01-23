const Subject = require('../models/Subject');

// @desc    Get all subjects
// @route   GET /api/subjects
// @access  Public
exports.getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();

        res.status(200).json({ success: true, count: subjects.length, data: subjects });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Create new subject
// @route   POST /api/subjects
// @access  Private (Admin only - for now maybe public for testing or authorized)
exports.createSubject = async (req, res) => {
    try {
        const subject = await Subject.create(req.body);

        res.status(201).json({ success: true, data: subject });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get single subject
// @route   GET /api/subjects/:id
// @access  Public
exports.getSubject = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);

        if (!subject) {
            return res.status(404).json({ success: false, error: 'Subject not found' });
        }

        res.status(200).json({ success: true, data: subject });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
