const { getExams } = require('../../services/examService');
const {
	EXAM_STATE: { pending },
} = require('../../constants');

module.exports = async courseId => {
	try {
		const exams = await getExams({ course: courseId, state: pending });
		console.log(exams);
		return exams;
	} catch (err) {
		console.log(err);
		throw err;
	}
};
