const { expireOne } = require('../../services/examService');

module.exports = async id => {
	try {
		const num = await expireOne(id);
		if (num != 1) throw new Error('NOT FOUND!');
		return num;
	} catch (err) {
		console.log(err);
		throw err;
	}
};
