const Student = require('./Student');
const Admin = require('./Admin');
const Category = require('./Category');
const Course = require('./Course');
const Exam = require('./Exam');
const Question = require('./Question');
const Revision = require('./Revision');
const Trainer = require('./Trainer');
const Enrollment = require('./join_tables/Enrollment');
const Teaching = require('./join_tables/Teaching');
const ExamQuestion = require('./ExamQuestion');
const Option = require('./questionOption');

// Student.sync();
// Category.sync();
// Course.sync();
// Exam.sync();
// Question.sync();
// Revision.sync();
// Trainer.sync();
// Enrollment.sync();
// Teaching.sync();
// ExamQuestion.sync();

module.exports = {
	Admin,
	Student,
	Category,
	Course,
	Exam,
	Question,
	Revision,
	Trainer,
	Enrollment,
	Teaching,
	ExamQuestion,
	Option,
};
