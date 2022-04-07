const {
	getSimpleExam,
	saveAnswers,
	updateExamState,
} = require('../../services/examService');
const isExpired = require('../../utils/isExpired');
const {
	EXAM_STATE: { pending, inComplete },
} = require('../../constants');

module.exports = async (studentId, examId, answers) => {
	try {
		const simpleExam = await getSimpleExam(examId);

		if (simpleExam.student !== studentId) throw new Error('unAuthorized!');
		if (isExpired(simpleExam)) {
			await updateExamState(simpleExam.id);
			throw new Error('Expired!');
		}
		if (simpleExam.state === inComplete) {
			await saveAnswers(examId, answers);
			await simpleExam.update({
				state: pending,
			});
		} else {
			throw new Error('unAuthorized!');
		}
	} catch (err) {
		console.log(err);
		throw err;
	}
};
