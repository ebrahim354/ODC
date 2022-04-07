const { updateOneTrainer } = require('../../services/trainerService');
module.exports = async (trainerId, updates) => {
	try {
		const trainer = await updateOneTrainer(trainerId, updates, true);
		return trainer;
	} catch (err) {
		throw new Error('Database Error!');
	}
};
