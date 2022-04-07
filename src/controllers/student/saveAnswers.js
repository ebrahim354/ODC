const {
	getSimpleExam,
	saveAnswers,
	updateExamState,
} = require('../../services/examService');
const {
	EXAM_STATE: { inComplete },
} = require('../../constants');
const isExpired = require('../../utils/isExpired');

module.exports = async (studentId, examId, answers) => {
	try {
		const simpleExam = await getSimpleExam(examId);

		if (simpleExam.student !== studentId) throw new Error('unAuthorized!');
		if (isExpired(simpleExam)) {
			await updateExamState(simpleExam.id);
			throw new Error('Expired!');
		}
		if (simpleExam.state === inComplete) {
			const savedAnswers = await saveAnswers(examId, answers);
			return savedAnswers;
		} else throw new Error('unAuthorized!');
	} catch (err) {
		console.log(err);
		throw err;
	}
};
