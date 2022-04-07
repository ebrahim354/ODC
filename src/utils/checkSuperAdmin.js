const { verify } = require('jsonwebtoken');
const { secret } = require('./config');
const { getOneAdmin } = require('../services/adminService');
const getToken = require('./getToken');
module.exports = async (req, res, next) => {
	try {
		const token = getToken(req);
		console.log(token);
		const payload = verify(token, secret);
		console.log('payload');
		const admin = await getOneAdmin({ id: payload.id });
		if (!admin || !admin.isSuperAdmin) throw new Error('unAuthorized');
		req.ctx = admin;
		next();
	} catch (err) {
		next(err);
	}
};
