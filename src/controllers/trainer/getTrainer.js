const { getJoinedTrainer } = require('../../services/trainerService');
module.exports = async id => {
	try {
		const trainer = await getJoinedTrainer(id);
		return trainer;
	} catch (err) {
		console.log(err);
		throw new Error('Database Error!');
	}
};
