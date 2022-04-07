const { getQuestions } = require('../../services/questionService');

module.exports = async filter => {
	try {
		const questions = await getQuestions(filter);
		return questions;
	} catch (err) {
		console.log(err);
		throw new Error('Database error!');
	}
};
