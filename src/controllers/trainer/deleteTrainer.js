const { deleteTainer } = require('../../services/trainerService');
module.exports = async trainerId => {
	try {
		const result = await deleteTainer(trainerId);
		return result;
	} catch (err) {
		throw new Error('Database Error!');
	}
};
