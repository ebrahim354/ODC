const { getJoinedCourse } = require('../../services/courseService');
module.exports = async id => {
	try {
		const course = await getJoinedCourse(id);
		return course;
	} catch (err) {
		console.log(err);
		throw new Error('Database Error!');
	}
};
