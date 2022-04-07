const { getPendingExam } = require('../../services/examService');

module.exports = async studentId => {
	try {
		const exam = await getPendingExam(studentId);
		return exam;
	} catch (err) {
		console.log(err);
		throw err;
	}
};
