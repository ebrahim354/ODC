//student
const register_student = require('./student/register');
const login_student = require('./student/login');
const verify_student = require('./student/verify');
const enroll = require('./student/enroll');
const get_exam = require('./student/getExam');
const save_answers = require('./student/saveAnswers');
const save_and_sumbit = require('./student/saveAndSubmit');
const get_revisions = require('./student/getRevisions');

//admin
const login_admin = require('./admin/login');
const get_students = require('./admin/getStudents');
const add_admin = require('./admin/addAdmin');
const set_role = require('./admin/setRole');

const set_course = require('./course/setCourse');
const get_course = require('./course/getCourse');
const delete_course = require('./course/deleteCourse');
const update_course = require('./course/updateCourse');
const get_courses = require('./course/getCourses');

const assign_trainer = require('./course/assignTrainer');
const unassign_trainer = require('./course/unassignTrainer');

const set_trainer = require('./trainer/setTrainer');
const get_trainer = require('./trainer/getTrainer');
const delete_trainer = require('./trainer/deleteTrainer');
const update_trainer = require('./trainer/updateTrainer');
const get_trainers = require('./trainer/getTrainers');

const set_category = require('./category/setCategory');
const delete_category = require('./category/deleteCategory');
const get_category = require('./category/getCategory');
const update_category = require('./category/updateCategory');
const get_categories = require('./category/getCategories');

const add_question = require('./question/addQuestion');
const delete_question = require('./question/deleteQuestion');
const get_questions = require('./question/getQuestions');

const get_exams = require('./exam/getPendingExams');
const get_pending_exam = require('./exam/getPendingExam');
const accept_exam = require('./exam/accept_exam');
const reject_exam = require('./exam/reject_exam');

const expire_all = require('./exam/expireAll');
const expire_one = require('./exam/expireOne');
const set_expires_in = require('./exam/setExpiresIn');

module.exports = {
	expire_all,
	expire_one,
	set_expires_in,

	add_question,
	delete_question,
	get_questions,

	register_student,
	login_student,
	verify_student,
	get_students,
	enroll,
	get_exam,
	save_answers,
	save_and_sumbit,
	get_revisions,

	login_admin,
	add_admin,

	set_course,
	delete_course,
	update_course,
	get_course,
	get_courses,

	set_category,
	delete_category,
	get_categories,
	get_category,
	update_category,

	get_exams,
	get_pending_exam,
	accept_exam,
	reject_exam,

	set_trainer,
	update_trainer,
	delete_trainer,
	get_trainer,
	get_trainers,
	assign_trainer,
	unassign_trainer,
	set_role,
};
