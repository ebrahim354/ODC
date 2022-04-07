const { getManyTrainers } = require('../../services/trainerService');
module.exports = async (filters, size = undefined) => {
	try {
		const trainers = await getManyTrainers(filters, size);
		return trainers;
	} catch (err) {
		console.log(err);
		throw new Error('Database Error!');
	}
};
