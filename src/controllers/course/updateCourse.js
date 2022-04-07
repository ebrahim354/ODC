const { updateOneCourse } = require('../../services/courseService');
module.exports = async (courseId, updates) => {
	try {
		const course = await updateOneCourse(courseId, updates, true);
		return course;
	} catch (err) {
		throw new Error('Database Error!');
	}
};
