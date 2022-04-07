const express = require('express');
const {
	STUDENT_REGISTER_ROUTE,
	STUDENT_LOGIN_ROUTE,
	STUDENT_ENROLL,
	STUDENT_GET_EXAM,
	STUDENT_SAVE_ANSWERS,
	STUDENT_SUBMIT_EXAM,
	STUDENT_GET_REVISIONS,
	STUDENT_VERIFY,
	CODE_SUCCESSFULL,
	UUID,
} = require('../constants');
const checkStudent = require('../utils/checkStudent');
const {
	register_student,
	login_student,
	enroll,
	get_exam,
	save_answers,
	save_and_sumbit,
	verify_student,
	get_revisions,
} = require('../controllers');

const Router = express.Router();

//Register
Router.post(STUDENT_REGISTER_ROUTE, async (req, res, next) => {
	const { email, password, phone, address, college, name } = req.body;

	try {
		if (!email || !password || !phone || !address || !college || !name) {
			console.log('there is an error');
			throw new Error('Invalid input');
		}

		await register_student({
			email,
			password,
			phone,
			address,
			college,
			name,
		});

		res.status(CODE_SUCCESSFULL).json({
			data: null,
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});

//verify
Router.post(STUDENT_VERIFY, async (req, res, next) => {
	const { code, email } = req.body;
	try {
		if (!code) throw new Error('Invalid input!');
		console.log('hello');

		const token = await verify_student(code, email);

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

// log in
Router.post(STUDENT_LOGIN_ROUTE, async (req, res, next) => {
	const { email, password, phone } = req.body;
	try {
		if (!(email || phone) || !password) {
			console.log(email);
			console.log(phone);
			console.log(password);
			throw new Error('Invalid input');
		}
		console.log('hello');

		const token = await login_student({ email, password, phone });

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

// enroll(start an exam).
// an exam can be in two states: pending or resolved.
// a resolved exam could be either rejected or accepted or expired(just like the promise system in js).
// a student can't start a new exam if he has a pending exam
// or an accepted exam (business requirement).
// chcking for accepted exams will be using the state field on exams.
// checking for pending will be using the state field on the exams table
// checking for expired will be using the expiration date on the exam + the state field.

Router.get(STUDENT_ENROLL, checkStudent, async (req, res, next) => {
	try {
		const courseId = req.params.courseId;
		const studentId = req.ctx.id;
		if (!UUID.test(courseId) || !UUID.test(studentId))
			throw new Error('Invalid input');

		const exam = await enroll(courseId, studentId);

		delete exam.updatedAt;
		delete exam.createdAt;
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
// get exam only if inComplete
Router.get(STUDENT_GET_EXAM, checkStudent, async (req, res, next) => {
	try {
		const studentId = req.ctx.id;
		const exam = await get_exam(studentId);
		delete exam.updated_at;
		exam.createdAt = exam.created_at;
		delete exam.created_at;
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
// save exam changes
Router.post(STUDENT_SAVE_ANSWERS, checkStudent, async (req, res, next) => {
	// answers [
	//	{answer, id}
	//]
	try {
		const examId = req.params.examId;
		const answers = req.body.answers;
		const studentId = req.ctx.id;
		if (!UUID.test(examId) || !Array.isArray(answers))
			throw new Error('Invalid input');
		for (let i = 0; i < answers.length; i++) {
			if (!UUID.test(answers[i].id)) throw new Error('Invalid input');
		}

		const savedAnswers = await save_answers(studentId, examId, answers);
		res.status(CODE_SUCCESSFULL).json({
			data: {
				answres: savedAnswers,
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});
// submit an exam
Router.post(STUDENT_SUBMIT_EXAM, checkStudent, async (req, res, next) => {
	// answers [
	//	{answer, id}
	//]
	try {
		const examId = req.params.examId;
		const answers = req.body.answers;
		const studentId = req.ctx.id;
		console.log(req.body);

		if (!UUID.test(examId) || !Array.isArray(answers))
			throw new Error('Invalid input');
		for (let i = 0; i < answers.length; i++) {
			if (!UUID.test(answers[i].id)) throw new Error('Invalid input');
		}

		await save_and_sumbit(studentId, examId, answers);
		res.status(CODE_SUCCESSFULL).json({
			data: {
				message: 'you have submitted your exam successfully',
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});

// view revisions for this student
Router.get(STUDENT_GET_REVISIONS, checkStudent, async (req, res, next) => {
	try {
		const studentId = req.ctx.id;
		const revisions = await get_revisions(studentId);
		res.status(CODE_SUCCESSFULL).json({
			data: {
				revisions,
			},
			errors: null,
		});
	} catch (err) {
		next(err);
	}
});

module.exports = Router;
