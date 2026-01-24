const Student = require('../models/Student');

// @desc    Get student statistics
// @route   GET /api/student/stats
// @access  Private
exports.getStudentStats = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id).populate('enrolledCourses.course');

        if (!student) {
            return res.status(404).json({ success: false, error: 'Student not found' });
        }

        const coursesCompleted = student.enrolledCourses.filter(c => c && c.completed).length;
        const totalHours = (student.studyStats?.totalStudyMinutes || 0) / 60;

        // Ensure dailyActivity is defined
        const dailyActivity = student.studyStats?.dailyActivity || [];

        // Get activity for the last 7 days (including today)
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const activity = dailyActivity.find(a => a.date === dateStr);

            // Format day name (Mon, Tue, etc.)
            const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

            last7Days.push({
                day: dayName,
                hours: activity ? (activity.minutes / 60) : 0,
                date: dateStr
            });
        }

        // Map courses safely handling potential missing/legacy data
        const coursesProgress = student.enrolledCourses
            .filter(enrolled => enrolled && enrolled.course)
            .map(enrolled => ({
                id: enrolled.course._id,
                name: enrolled.course.name,
                code: enrolled.course.code,
                progress: enrolled.progress || 0,
                completed: enrolled.completed || false
            }));

        const stats = {
            streak: student.studyStats?.streak || 0,
            coursesEnrolled: student.enrolledCourses.length,
            coursesCompleted: coursesCompleted,
            totalHours: parseFloat(totalHours.toFixed(1)),
            weeklyActivity: last7Days,
            coursesProgress: coursesProgress
        };

        res.status(200).json({ success: true, data: stats });
    } catch (err) {
        console.error("Error in getStudentStats:", err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update study time (call this periodically or on session end)
// @route   POST /api/student/log-time
// @access  Private
exports.logStudyTime = async (req, res) => {
    try {
        const { minutes } = req.body;
        if (!minutes || minutes <= 0) {
            return res.status(400).json({ success: false, error: 'Invalid minutes' });
        }

        const student = await Student.findById(req.user.id);

        // Update total time
        if (!student.studyStats) {
            student.studyStats = { totalStudyMinutes: 0, streak: 0, dailyActivity: [] };
        }
        student.studyStats.totalStudyMinutes += minutes;

        // Update daily activity
        const today = new Date().toISOString().split('T')[0];
        const activityIndex = student.studyStats.dailyActivity.findIndex(a => a.date === today);

        if (activityIndex > -1) {
            student.studyStats.dailyActivity[activityIndex].minutes += minutes;
        } else {
            student.studyStats.dailyActivity.push({ date: today, minutes: minutes });
        }

        // Update streak logic (simplified)
        const lastStudy = student.studyStats.lastStudyDate ? new Date(student.studyStats.lastStudyDate).toISOString().split('T')[0] : null;

        if (lastStudy !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (lastStudy === yesterdayStr) {
                student.studyStats.streak += 1;
            } else {
                student.studyStats.streak = 1; // Reset or start new
            }
            student.studyStats.lastStudyDate = new Date();
        }

        await student.save();

        res.status(200).json({ success: true, data: student.studyStats });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update course progress
// @route   PUT /api/student/course/:courseId/progress
// @access  Private
exports.updateCourseProgress = async (req, res) => {
    try {
        const { progress } = req.body; // 0-100
        const { courseId } = req.params;

        const student = await Student.findById(req.user.id);
        const courseIndex = student.enrolledCourses.findIndex(c => c.course.toString() === courseId);

        if (courseIndex === -1) {
            return res.status(404).json({ success: false, error: 'Not enrolled in this course' });
        }

        student.enrolledCourses[courseIndex].progress = progress;
        if (progress >= 100) {
            student.enrolledCourses[courseIndex].completed = true;
        }

        await student.save();

        res.status(200).json({ success: true, data: student.enrolledCourses[courseIndex] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
