const { verify } = require('jsonwebtoken');
const { secret } = require('./config');
const { getOneStudent } = require('../services/studentService');
const getToken = require('./getToken');

module.exports = async (req, res, next) => {
	try {
		const token = getToken(req);
		console.log(token);
		const payload = verify(token, secret);
		console.log('payload');
		const student = await getOneStudent({ id: payload.id });
		if (!student) throw new Error('unAuthorized');
		req.ctx = student;
		next();
	} catch (err) {
		next(err);
	}
};
