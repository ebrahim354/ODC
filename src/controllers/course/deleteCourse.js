const { deleteCourse } = require('../../services/courseService');
module.exports = async courseId => {
	try {
		const result = await deleteCourse(courseId);
		return result;
	} catch (err) {
		throw new Error('Database Error!');
	}
};
