const { getOneAdmin } = require('../../services/adminService');
const bcrypt = require('bcrypt');
const createToken = require('../../utils/createToken');

module.exports = async ({ email, password }) => {
	try {
		const checkAdmin = await getOneAdmin({ email });
		let checkPassword;
		console.log('checkAdmin', checkAdmin);

		if (!checkAdmin) throw new Error('Invalid email or password');
		console.log('checkAdmin', password, checkAdmin.password);

		if (!checkAdmin.isSuperUser)
			checkPassword = await bcrypt.compare(password, checkAdmin.password);
		else checkPassword = password === checkAdmin.password;

		if (!checkPassword) {
			throw new Error('Invalid email or password!');
		}

		const payload = {
			id: checkAdmin.id,
		};

		return createToken(payload);
	} catch (error) {
		console.log(error);
		throw new Error('Invalid input');
	}
};
