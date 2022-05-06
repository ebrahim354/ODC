const { getOneAdmin } = require('../../services/adminService');
const bcrypt = require('bcrypt');
const createToken = require('../../utils/createToken');

module.exports = async ({ email, password }) => {
	try {
		const checkAdmin = await getOneAdmin({ email });
		let checkPassword;
		console.log('checkAdmin', checkAdmin);

		if (!checkAdmin) {
			console.log('hello2');
			throw new Error('Invalid email or password');
		}
		console.log('checkAdmin', password, checkAdmin.password);

		if (!checkAdmin.isSuperAdmin)
			checkPassword = await bcrypt.compare(password, checkAdmin.password);
		else {
			console.log('hello');
			checkPassword = password === checkAdmin.password;
		}

		if (!checkPassword) {
			console.log('chceckPassword', checkPassword);
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
