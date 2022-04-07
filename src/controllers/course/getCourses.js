const { getManyCourses } = require('../../services/courseService');
module.exports = async (filters, size = undefined) => {
	try {
		const courses = await getManyCourses(filters, size);
		return courses;
	} catch (err) {
		console.log(err);
		throw new Error('Database Error!');
	}
};
