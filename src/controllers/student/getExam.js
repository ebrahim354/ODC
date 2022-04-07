const { getExam, updateExamState } = require('../../services/examService');
const isExpired = require('../../utils/isExpired');

module.exports = async studentId => {
	try {
		const exam = await getExam(studentId);
		exam.expiresIn = exam.expires_in;
		delete exam.expires_in;
		if (isExpired(exam)) {
			await updateExamState(exam.id);
			throw new Error('Expired!');
		}
		return exam;
	} catch (err) {
		console.log(err);
		throw err;
	}
};
