const createToken = require('../../utils/createToken');
const bcrypt = require('bcrypt');
const { getOneStudent } = require('../../services/studentService');

module.exports = async ({ email, phone, password }) => {
	try {
		let checkUser;
		if (email) checkUser = await getOneStudent({ email });
		else checkUser = await getOneStudent({ phone: phone });

		if (!checkUser) throw new Error('Invalid username or password');
		if (checkUser.verification !== 'verified') throw new Error('Not verified!');
		const checkPassword = await bcrypt.compare(password, checkUser.password);
		if (!checkPassword) {
			throw new Error('Invalid username or password!');
		}

		const payload = {
			id: checkUser.id,
		};

		const token = createToken(payload);

		return token;
	} catch (error) {
		console.log(error);
		throw new Error('Invalid input');
	}
};
