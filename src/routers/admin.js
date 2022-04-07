const express = require('express');
const {
	ADMIN_LOGIN_ROUTE,
	CODE_SUCCESSFULL,
	ADMIN_ALL_STUDENTS,
	ADMIN_ADD_ADMIN,
	ADMIN_SET_ROLE,

	ADMIN_SET_CATEGORY,
	ADMIN_GET_CATEGORIES,
	ADMIN_GET_CATEGORY,
	ADMIN_DELETE_CATEGORY,
	ADMIN_UPDATE_CATEGORY,

	ADMIN_SET_COURSE,
	ADMIN_GET_COURSES,
	ADMIN_UPDATE_COURSE,
	ADMIN_GET_COURSE,
	ADMIN_DELETE_COURSE,

	ADMIN_ASSIGN_TRAINER,
	ADMIN_UNASSIGN_TRAINER,

	ADMIN_SET_TRAINER,
	ADMIN_GET_TRAINERS,
	ADMIN_UPDATE_TRAINER,
	ADMIN_GET_TRAINER,
	ADMIN_DELETE_TRAINER,

	ADMIN_ADD_QUESTION,
	ADMIN_DELETE_QUESTION,
	ADMIN_GET_QUSTIONS,

	ADMIN_GET_EXAMS,
	ADMIN_GET_EXAM,
	ADMIN_REJECT_EXAM,
	ADMIN_ACCEPT_EXAM,

	ADMIN_EXPIRE_EXAMS,
	ADMIN_EXPIRE_EXAM,
	ADMIN_SET_EXPIRES_IN,

	UUID,
} = require('../constants');
const {
	expire_all,
	set_role,

	add_question,
	delete_question,
	get_questions,

	login_admin,
	add_admin,

	get_students,

	delete_course,
	get_courses,
	get_course,
	update_course,
	set_course,

	assign_trainer,
	unassign_trainer,

	set_category,
	delete_category,
	update_category,
	get_category,
	get_categories,

	get_exams,
	get_pending_exam,
	accept_exam,
	reject_exam,

	delete_trainer,
	get_trainers,
	get_trainer,
	update_trainer,
	set_trainer,
	expire_one,
	set_expires_in,
} = require('../controllers');
const checkAdmin = require('../utils/checkAdmin');
const checkExamReviewer = require('../utils/checkExamReviewer');
const checkSuperAdmin = require('../utils/checkSuperAdmin');
const isDate = require('../utils/isDate');

const Router = express.Router();
// log in
Router.post(ADMIN_LOGIN_ROUTE, async (req, res, next) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) throw new Error('Invalid input');

		const token = await login_admin({ email, password });

		res.status(CODE_SUCCESSFULL).json({
			data: {
				token,
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
// get-students
Router.get(ADMIN_ALL_STUDENTS, checkAdmin, async (req, res, next) => {
	// add filters as parameters later on
	try {
		const students = await get_students();
		res.status(CODE_SUCCESSFULL).json({
			data: {
				students,
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});

//course routers
// delete course
Router.delete(ADMIN_DELETE_COURSE, checkAdmin, async (req, res, next) => {
	try {
		const courseId = req.params.courseId;
		if (!UUID.test(courseId)) throw new Error('Invalid Input');
		const result = await delete_course(courseId);
		res.status(CODE_SUCCESSFULL).json({
			data: { result },
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
// get courses
Router.get(ADMIN_GET_COURSES, checkAdmin, async (req, res, next) => {
	// add filtering later
	try {
		const courses = await get_courses();
		res.status(CODE_SUCCESSFULL).json({
			data: { courses },
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
// get one course
Router.get(ADMIN_GET_COURSE, checkAdmin, async (req, res, next) => {
	try {
		const courseId = req.params.courseId;
		if (!UUID.test(courseId)) throw new Error('Invalid In/:idput');
		const course = await get_course(courseId);
		res.status(CODE_SUCCESSFULL).json({
			data: { course },
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
// update course
Router.put(ADMIN_UPDATE_COURSE, checkAdmin, async (req, res, next) => {
	try {
		const { name, level, category } = req.body.updates;
		const courseId = req.params.courseId;
		if (!UUID.test(courseId)) throw new Error('Invalid Input');
		const course = await update_course(courseId, { name, level, category });
		res.status(CODE_SUCCESSFULL).json({
			data: { course },
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
// set-course
Router.post(ADMIN_SET_COURSE, checkAdmin, async (req, res, next) => {
	const { name, level, category, instructors } = req.body;
	try {
		if (
			!name ||
			!level ||
			!category ||
			!instructors ||
			!Array.isArray(instructors) ||
			!instructors.length
		) {
			console.log(!instructors.length);
			console.log(!Array.isArray(instructors));
			console.log('invalid input');
			throw new Error('Invalid input');
		}
		const course = await set_course({ name, level, category }, instructors);
		res.status(CODE_SUCCESSFULL).json({
			data: {
				course,
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});

// delete category
Router.delete(ADMIN_DELETE_CATEGORY, checkAdmin, async (req, res, next) => {
	try {
		const categoryId = req.params.categoryId;
		if (!UUID.test(categoryId)) throw new Error('Invalid Input');
		const result = await delete_category(categoryId);
		res.status(CODE_SUCCESSFULL).json({
			data: { result },
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
// get categories
Router.get(ADMIN_GET_CATEGORIES, checkAdmin, async (req, res, next) => {
	// add filtering later
	try {
		const categories = await get_categories();
		res.status(CODE_SUCCESSFULL).json({
			data: { categories },
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
// get one category
Router.get(ADMIN_GET_CATEGORY, checkAdmin, async (req, res, next) => {
	try {
		const categoryId = req.params.categoryId;
		const category = await get_category(categoryId);
		if (!UUID.test(categoryId)) throw new Error('Invalid Input');
		res.status(CODE_SUCCESSFULL).json({
			data: { category },
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
// update category
Router.put(ADMIN_UPDATE_CATEGORY, checkAdmin, async (req, res, next) => {
	try {
		const { name } = req.body.updates;
		const categoryId = req.params.categoryId;
		if (!name || !UUID.test(categoryId)) throw new Error('Invalid Input');
		const category = await update_category(categoryId, { name });
		res.status(CODE_SUCCESSFULL).json({
			data: { category },
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
// set-category
Router.post(ADMIN_SET_CATEGORY, checkAdmin, async (req, res, next) => {
	const { name } = req.body;
	try {
		if (!name) throw new Error('Invalid input');
		const category = await set_category(name);
		res.status(CODE_SUCCESSFULL).json({
			data: {
				category,
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
// add admin
Router.post(ADMIN_ADD_ADMIN, checkSuperAdmin, async (req, res, next) => {
	try {
		const { name, email, role, image } = req.body;
		if (!name || !email || !role) throw new Error('Invalid input');
		const admin = await add_admin({ name, email, role, image });
		admin.password = null;
		res.status(CODE_SUCCESSFULL).json({
			data: {
				admin,
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});

// add question
Router.post(ADMIN_ADD_QUESTION, checkAdmin, async (req, res, next) => {
	try {
		const { content, category, options } = req.body;
		if (!content || !category) throw new Error('Invalid input');
		const question = await add_question({ content, category }, options);
		res.status(CODE_SUCCESSFULL).json({
			data: {
				question,
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
//see all questions
Router.get(ADMIN_GET_QUSTIONS, checkAdmin, async (req, res, next) => {
	try {
		const questions = await get_questions();
		res.status(CODE_SUCCESSFULL).json({
			data: {
				questions,
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
// remove question
Router.delete(ADMIN_DELETE_QUESTION, checkAdmin, async (req, res, next) => {
	try {
		const questionId = req.params.questionId;
		if (!UUID.test(questionId)) throw new Error('Invalid input');
		const result = await delete_question(questionId);
		res.status(CODE_SUCCESSFULL).json({
			data: {
				result,
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});

// get pending exams for specific course.
Router.get(ADMIN_GET_EXAMS, checkAdmin, async (req, res, next) => {
	const courseId = req.params.courseId;
	try {
		if (!UUID.test(courseId)) throw new Error('Invalid input');
		const exams = await get_exams(courseId);
		res.status(CODE_SUCCESSFULL).json({
			data: {
				exams,
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
// get one joined exam with answers
Router.get(ADMIN_GET_EXAM, checkAdmin, async (req, res, next) => {
	const examId = req.params.examId;
	try {
		if (!UUID.test(examId)) throw new Error('Invalid input');
		const exam = await get_pending_exam(examId);
		res.status(CODE_SUCCESSFULL).json({
			data: {
				exam,
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
// review specific exam and send email.
// accept an exam.
Router.post(
	ADMIN_ACCEPT_EXAM,
	checkAdmin,
	checkExamReviewer,
	async (req, res, next) => {
		try {
			const examId = req.params.examId;
			const adminId = req.ctx.id;
			const { maxDegree, minDegree, degree } = req.body;
			if (
				!UUID.test(examId) ||
				!UUID.test(adminId) ||
				!maxDegree ||
				!minDegree ||
				!degree ||
				degree < minDegree
			)
				throw new Error('Invalid input');

			const revision = await accept_exam(examId, adminId, {
				maxDegree,
				minDegree,
				degree,
			});
			res.status(CODE_SUCCESSFULL).json({
				data: {
					revision,
				},
				errors: null,
			});
		} catch (err) {
			next(err);
		}
	}
);
// reject an exam.
Router.post(
	ADMIN_REJECT_EXAM,
	checkAdmin,
	checkExamReviewer,
	async (req, res, next) => {
		try {
			const examId = req.params.examId;
			const adminId = req.ctx.id;
			const { maxDegree, minDegree, degree } = req.body;
			if (
				!UUID.test(examId) ||
				!UUID.test(adminId) ||
				!maxDegree ||
				!minDegree ||
				!degree
			)
				throw new Error('Invalid input');

			const revision = await reject_exam(examId, adminId, {
				maxDegree,
				minDegree,
				degree,
			});
			res.status(CODE_SUCCESSFULL).json({
				data: {
					revision,
				},
				errors: null,
			});
		} catch (err) {
			next(err);
		}
	}
);

//delete trainer
Router.delete(ADMIN_DELETE_TRAINER, checkAdmin, async (req, res, next) => {
	try {
		const trainerId = req.params.trainerId;
		if (!UUID.test(trainerId)) throw new Error('Invalid Input');
		const result = await delete_trainer(trainerId);
		res.status(CODE_SUCCESSFULL).json({
			data: { result },
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
// get trainers
Router.get(ADMIN_GET_TRAINERS, checkAdmin, async (req, res, next) => {
	// add filtering later
	try {
		const trainers = await get_trainers();
		res.status(CODE_SUCCESSFULL).json({
			data: { trainers },
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
// get one trainer
Router.get(ADMIN_GET_TRAINER, checkAdmin, async (req, res, next) => {
	try {
		const trainerId = req.params.trainerId;
		if (!UUID.test(trainerId)) throw new Error('Invalid Input');
		const trainer = await get_trainer(trainerId);
		res.status(CODE_SUCCESSFULL).json({
			data: { trainer },
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
// update trainer
Router.put(ADMIN_UPDATE_TRAINER, checkAdmin, async (req, res, next) => {
	try {
		const { name } = req.body.updates;
		const trainerId = req.params.trainerId;
		if (!UUID.test(trainerId)) throw new Error('Invalid Input');
		const trainer = await update_trainer(trainerId, { name });
		res.status(CODE_SUCCESSFULL).json({
			data: { trainer },
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
// set-trainer
Router.post(ADMIN_SET_TRAINER, checkAdmin, async (req, res, next) => {
	const { name } = req.body;
	try {
		if (!name) throw new Error('Invalid input');

		const trainer = await set_trainer({ name });
		res.status(CODE_SUCCESSFULL).json({
			data: {
				trainer,
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});

Router.post(ADMIN_ASSIGN_TRAINER, checkAdmin, async (req, res, next) => {
	const { trainerId, courseId } = req.body;
	const adminId = req.ctx.id;
	try {
		if ((!UUID.test(trainerId), !UUID.test(courseId)))
			throw new Error('Invalid input');

		const course = await assign_trainer({ trainerId, courseId, adminId });
		res.status(CODE_SUCCESSFULL).json({
			data: {
				course,
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});

Router.post(ADMIN_UNASSIGN_TRAINER, checkAdmin, async (req, res, next) => {
	const { trainerId, courseId } = req.body;
	const adminId = req.ctx.id;
	try {
		if ((!UUID.test(trainerId), !UUID.test(courseId)))
			throw new Error('Invalid input');

		const course = await unassign_trainer({ trainerId, courseId, adminId });
		res.status(CODE_SUCCESSFULL).json({
			data: {
				course,
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});

// expire all exams
Router.post(ADMIN_EXPIRE_EXAMS, checkAdmin, async (req, res, next) => {
	try {
		const numOfExpires = await expire_all();
		res.status(CODE_SUCCESSFULL).json({
			data: {
				numberOfExpired: numOfExpires,
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
// expire one exam
Router.post(ADMIN_EXPIRE_EXAM, checkAdmin, async (req, res, next) => {
	const examId = req.params.examId;
	try {
		if (!UUID.test(examId)) throw new Error('Invalid input!');
		const numOfExpires = await expire_one(examId);
		res.status(CODE_SUCCESSFULL).json({
			data: {
				numberOfExpired: numOfExpires,
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});

// set expires in
Router.post(ADMIN_SET_EXPIRES_IN, checkAdmin, async (req, res, next) => {
	const examId = req.params.examId;
	const date = req.body.date;
	try {
		if (!UUID.test(examId) || !isDate(date)) throw new Error('Invalid input');
		const numOfExpires = await set_expires_in(examId, date);
		res.status(CODE_SUCCESSFULL).json({
			data: {
				numberOfExpired: numOfExpires,
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});

//set role for an admin
Router.post(ADMIN_SET_ROLE, checkSuperAdmin, async (req, res, next) => {
	try {
		const targetId = req.params.targetId;
		const { role } = req.body;

		if (!role || !UUID.test(targetId)) throw new Error('Invalid input');
		const admin = await set_role(targetId, role);
		res.status(CODE_SUCCESSFULL).json({
			data: {
				admin,
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});

module.exports = Router;
