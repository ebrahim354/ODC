const { getManyStudents } = require('../../services/studentService');
module.exports = async filters => {
	try {
		const students = await getManyStudents(filters);
		return students;
	} catch (err) {
		throw new Error('Database Error!');
	}
};
