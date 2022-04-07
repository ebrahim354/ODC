const { Question, Option } = require('../models/');
const { sequelize } = require('../utils/dbConn');

const getQuestions = async (filters, limit = undefined) => {
	const questions = await Question.findAll({
		where: {
			...filters,
		},
		limit,
		raw: true,
	});
	return questions;
};

const deleteQuestion = async id => {
	const result = await Question.destroy({
		where: {
			id,
		},
	});
	return !!result;
};

const addQuestion = async (data, options, returning = false) => {
	try {
		const question = sequelize.transaction(async t => {
			const newQuestion = await Question.create(data, {
				returning,
				transaction: t,
			});
			if (!options || !options.length || !Array.isArray(options))
				return newQuestion;
			for (let option of options) {
				await Option.create(
					{
						content: option,
						question: newQuestion.id,
					},
					{
						transaction: t,
					}
				);
			}
			return newQuestion;
		});
		return returning ? question : undefined;
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	getQuestions,
	addQuestion,
	deleteQuestion,
};
