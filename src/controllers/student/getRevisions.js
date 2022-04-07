const { getRevisions } = require('../../services/studentService');

module.exports = async studentId => {
	try {
		const revisions = getRevisions(studentId);
		return revisions;
	} catch (err) {
		console.log(err);
		throw err;
	}
};
