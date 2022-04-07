const { addQuestion } = require('../../services/questionService');

module.exports = async ({ content, category }, options) => {
	try {
		const question = await addQuestion({ content, category }, options, true);
		return question;
	} catch (err) {
		console.log(err);
		throw new Error('Database error!');
	}
};
