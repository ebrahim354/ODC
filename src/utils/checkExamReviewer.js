const {
	ROLES: { examReviewer },
} = require('../constants');
module.exports = async (req, res, next) => {
	try {
		const role = req.ctx.role;
		const isSuperAdmin = req.ctx.isSuperAdmin;
		if (role === examReviewer || isSuperAdmin) next();
		else throw new Error('unAuthorized!');
	} catch (err) {
		next(err);
	}
};
