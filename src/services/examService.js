const { Exam, ExamQuestion, Revision, Enrollment } = require('../models/');
const { getCourse } = require('../services/courseService');
const { sequelize } = require('../utils/dbConn');
const {
	EXAM_STATE: { inComplete, expired, pending, accepted, rejected },
	EXAM_DURATION,
} = require('../constants');

const saveAnswers = async (examId, answers) => {
	let savedAnswers = [];
	for (let answer of answers) {
		if (answer.answer) {
			const [, saved] = await ExamQuestion.update(
				{
					answer: answer.answer,
				},
				{
					where: {
						id: answer.id,
						exam: examId,
					},
					returning: ['answer', 'id', 'exam'],
					raw: true,
				}
			);
			savedAnswers.push(saved[0]);
		}
	}
	console.log('savedAnswers', savedAnswers);
	return savedAnswers;
};

const getSimpleExam = async examId => {
	const exam = await Exam.findOne({
		where: {
			id: examId,
		},
	});
	return exam;
};

const updateExamState = async examId => {
	try {
		await Exam.update(
			{ expiresIn: expired },
			{
				where: {
					id: examId,
				},
			}
		);
	} catch (err) {
		console.log(err);
	}
};

const getExams = async (filters, limit = undefined) => {
	const exams = await Exam.findAll({
		where: {
			...filters,
		},
		limit,
		raw: true,
	});
	return exams;
};

const getPendingExam = async examId => {
	try {
		const [[exam]] = await sequelize.query(
			`
			select e.*, 
			array_agg(json_build_object(
				'id', eq.id,
				'content',q.content, 
				'answer', eq.answer
				)) as questions
			from exams e
			join exam_questions eq on e.id = eq.exam
			join questions q on eq.question = q.id
			where e.id = '${examId}' and e.state = ${pending}
			group by e.id;
		`,
			{ raw: true }
		);
		if (!exam) throw new Error('NOT FOUND!');
		return exam;
	} catch (err) {
		console.log(err);
		throw new Error('NOT FOUND!');
	}
};

const getExam = async studentId => {
	try {
		const exam = await sequelize.transaction(async t => {
			const [[exam]] = await sequelize.query(
				`
			select e.*, 
			array_agg(json_build_object(
				'id', eq.id,
				'questionId', q.id,
				'content',q.content, 
				'answer', eq.answer
				)) as questions
			from exams e
			join exam_questions eq on e.id = eq.exam
			join questions q on eq.question = q.id
			where e.student = '${studentId}' and e.state = ${inComplete}
			group by e.id;
		`,
				{ raw: true, transaction: t }
			);
			if (!exam) throw new Error('NOT FOUND!');

			const [options] = await sequelize.query(
				`
			select  o.question, array_agg (o.content) as options 
			from options o
			where o.question in (${exam.questions.map(q => `'${q.questionId}'`).toString()})
			group by o.question;
		`,
				{ transaction: t }
			);

			for (let i = 0; i < exam.questions.length; i++) {
				for (let j = 0; j < options.length; j++) {
					if (options[j].question === exam.questions[i].questionId) {
						exam.questions[i].options = options[j].options;
					}
				}
				if (!exam.questions[i].options) exam.questions[i].options = [];
				delete exam.questions[i].questionId;
			}
			return exam;
		});
		return exam;
	} catch (err) {
		console.log(err);
		throw new Error('NOT FOUND!');
	}
};

const generateExam = async (courseId, studentId, limit = 10) => {
	try {
		const exam = await sequelize.transaction(async t => {
			const course = await getCourse(courseId);
			if (!course) throw new Error('Course not found');

			// fix null array later
			const [questions] = await sequelize.query(
				`
    select q.id, q.content, coalesce ( array_agg(o.content) 
		filter (where o.content is not null), '{}' ) as options
	 	from questions q
		left join options o on q.id = o.question
    where q.category = '${course.category}'
		group by q.id
    order by random()
    limit ${limit};
  `,
				{
					transaction: t,
					raw: true,
				}
			);

			const { dataValues: newExam } = await Exam.create(
				{
					student: studentId,
					course: courseId,
					state: inComplete,
					expiresIn: new Date(Date.now() + EXAM_DURATION),
				},
				{ transaction: t, returning: true, raw: true }
			);

			newExam.questions = questions;

			for (let q of questions) {
				await ExamQuestion.create(
					{
						question: q.id,
						exam: newExam.id,
					},
					{ transaction: t }
				);
			}
			return newExam;
		});
		return exam;
	} catch (err) {
		console.log(err);
		throw new Error('Database error');
	}
};

const acceptExam = async (
	examId,
	adminId,
	{ maxDegree, minDegree, degree }
) => {
	try {
		const revision = await sequelize.transaction(async t => {
			const [, [exam]] = await Exam.update(
				{
					state: accepted,
				},
				{
					where: {
						id: examId,
						state: pending,
					},
					raw: true,
					transaction: t,
					returning: true,
				}
			);
			if (!exam) throw new Error('NOT FOUND!');
			console.log('exam: ', exam);
			const revision = await Revision.create(
				{
					maxDegree,
					minDegree,
					degree,
					reviewdBy: adminId,
					student: exam.student,
					exam: exam.id,
				},
				{
					returning: true,
					raw: true,
					transaction: t,
				}
			);
			await Enrollment.create(
				{
					course: exam.course,
					student: exam.student,
				},
				{ transaction: t }
			);
			return [revision, exam.student, exam.course];
		});
		return revision;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

const rejectExam = async (
	examId,
	adminId,
	{ maxDegree, minDegree, degree }
) => {
	try {
		const revision = await sequelize.transaction(async t => {
			const [, [exam]] = await Exam.update(
				{
					state: rejected,
				},
				{
					where: {
						id: examId,
						state: pending,
					},
					raw: true,
					returning: true,
					transaction: t,
				}
			);
			if (!exam) throw new Error('NOT FOUND!');
			const revision = await Revision.create(
				{
					maxDegree,
					minDegree,
					degree,
					reviewdBy: adminId,
					student: exam.student,
					exam: exam.id,
				},
				{
					returning: true,
					raw: true,
					transaction: t,
				}
			);
			return [revision, exam.student, exam.course];
		});
		return revision;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

const expireAll = async () => {
	try {
		const [number] = await Exam.update(
			{
				state: expired,
				expiresIn: Date.now(),
			},
			{
				where: {
					state: inComplete,
				},
			}
		);
		console.log('expires: ', number);
		return number;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

const expireOne = async id => {
	try {
		const [number] = await Exam.update(
			{
				state: expired,
				expiresIn: Date.now(),
			},
			{
				where: {
					state: inComplete,
					id,
				},
			}
		);
		console.log('expires: ', number);
		return number;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

const setExpiresIn = async (id, date) => {
	try {
		const [number] = await Exam.update(
			{
				expiresIn: date,
			},
			{
				where: {
					state: inComplete,
					id,
				},
			}
		);
		console.log('expires: ', number);
		return number;
	} catch (err) {
		console.log(err);
		throw err;
	}
};
module.exports = {
	getExams,
	generateExam,
	getExam,
	updateExamState,
	getSimpleExam,
	saveAnswers,
	getPendingExam,
	acceptExam,
	rejectExam,
	expireAll,
	expireOne,
	setExpiresIn,
};
