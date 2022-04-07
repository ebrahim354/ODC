const { setExpiresIn } = require('../../services/examService');

module.exports = async (id, date) => {
	try {
		const num = await setExpiresIn(id, date);
		if (num != 1) throw new Error('NOT FOUND!');
		return num;
	} catch (err) {
		console.log(err);
		throw err;
	}
};
