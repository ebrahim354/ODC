const { unassignTrainer } = require('../../services/courseService');

module.exports = async ({ trainerId, courseId }) => {
	try {
		const course = await unassignTrainer({ trainerId, courseId });
		return course;
	} catch (err) {
		console.log(err);
		throw err;
	}
};
