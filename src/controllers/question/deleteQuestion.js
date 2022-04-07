const { deleteQuestion } = require('../../services/questionService');

module.exports = async id => {
	try {
		const result = await deleteQuestion(id);
		return result;
	} catch (err) {
		console.log(err);
		throw new Error('Database error!');
	}
};
