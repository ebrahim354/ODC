const {
	EXAM_STATE: { accepted, rejected, expired, pending },
} = require('../constants');
module.exports = exam => {
	if (
		exam.state === accepted ||
		exam.state === rejected ||
		exam.state === pending
	)
		return false;
	console.log('exam expiresIn: ', exam.expiresIn);
	const isExpired = exam.expiresIn - Date.now() < 0;
	if (isExpired) {
		exam.state = expired;
	}
	return isExpired;
};
