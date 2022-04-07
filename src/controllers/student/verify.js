const createToken = require('../../utils/createToken');
const {
	getOneStudent,
	updateStudent,
} = require('../../services/studentService');

module.exports = async (code, email) => {
	try {
		let checkUser;
		if (email) checkUser = await getOneStudent({ email });

		if (!checkUser) throw new Error('Invalid username or password');
		if (checkUser.verification !== code) throw new Error('Not verified!');

		await updateStudent(checkUser.id, {
			verification: 'verified',
		});

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
