const { expireAll } = require('../../services/examService');

module.exports = async () => {
	try {
		const num = await expireAll();
		return num;
	} catch (err) {
		console.log(err);
		throw err;
	}
};
