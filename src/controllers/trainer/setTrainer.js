const { addTrainer } = require('../../services/trainerService');
module.exports = async ({ name }) => {
	try {
		const trainer = await addTrainer({ name }, true);
		return trainer;
	} catch (err) {
		console.log('Controller error!');
		console.log(err);
		throw new Error('Invalid input');
	}
};
