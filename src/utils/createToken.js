const { secret } = require('./config');
const jwt = require('jsonwebtoken');

module.exports = (payload, expiresIn = 60 * 60 * 24) => {
	const token = jwt.sign(payload, secret, {
		expiresIn,
	});
	return token;
};
