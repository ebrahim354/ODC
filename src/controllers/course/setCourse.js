const { addCourse } = require('../../services/courseService');
module.exports = async ({ name, level, category }, instructors) => {
	try {
		const course = await addCourse(
			{ name, level, category },
			instructors,
			true
		);
		return course;
	} catch (err) {
		console.log('Controller error!');
		console.log(err);
		throw new Error('Invalid input');
	}
};
