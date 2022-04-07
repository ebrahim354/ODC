const { assignTrainer } = require('../../services/courseService');

module.exports = async ({ trainerId, courseId, adminId }) => {
	try {
		const course = await assignTrainer({ trainerId, courseId, adminId });
		return course;
	} catch (err) {
		console.log(err);
		throw err;
	}
};
