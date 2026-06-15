const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Load models
const Subject = require('./src/models/Subject');
const Lecture = require('./src/models/Lecture');

const Student = require('./src/models/Student');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const subjects = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/subjects.json`, 'utf-8')
);

const lectures = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/lectures.json`, 'utf-8')
);



// Import into DB
const importData = async () => {
    try {
        // Create Subjects
        const createdSubjects = await Subject.create(subjects);

        // Generate dummy lectures for each subject
        const allLectures = [];

        for (const subject of createdSubjects) {
            allLectures.push(
                {
                    title: `Introduction to ${subject.name}`,
                    description: `Basic concepts and overview of ${subject.name}. In this lecture we will cover the fundamental principles.`,
                    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    pdfUrl: subject.driveLink,
                    subject: subject._id
                },
                {
                    title: `${subject.name} - Advanced Concepts`,
                    description: `Deep dive into advanced topics of ${subject.name}. Exploring complex problems and solutions.`,
                    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    subject: subject._id
                },
                {
                    title: `${subject.name} - Practical Applications`,
                    description: `Real-world applications and case studies for ${subject.name}.`,
                    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    subject: subject._id
                }
            );
        }

        // Create Lectures
        await Lecture.create(allLectures);

        console.log('Data Imported with generated lectures...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Subject.deleteMany();
        await Lecture.deleteMany();

        // await Student.deleteMany(); // Optional: Don't delete users by default
        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
} else {
    console.log('Please add argument: -i to import or -d to delete');
    process.exit();
}
