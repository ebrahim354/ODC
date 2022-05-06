const bcrypt = require('bcrypt');
const { addAdmin } = require('../../services/adminService');
const generatePassword = require('../../utils/generatePassowrd');
const sendEmail = require('../../utils/sendEmail');
const { envEmail } = require('../../utils/config');

const saltRounds = 10;

module.exports = async admin => {
	try {
		const password = generatePassword(10);
		console.log('hello');
		admin.password = password;

		const text = `
      you are assigned as an admin for the ODC project you can log in using 
      this email and your password is : ${password},
      if you have not idea what this is please just delete the message,
      have a good day.
    `;
		const subject = 'you are assigned as an admin for ODC';
		console.log(envEmail);
		await sendEmail(admin.email, envEmail, subject, text);

		const hash = await bcrypt.hash(password, saltRounds);
		admin.password = hash;

		const savedAdmin = await addAdmin(admin, true);
		savedAdmin.password = null;
		return savedAdmin;
	} catch (error) {
		console.log(error);
		throw new Error('Invalid input');
	}
};
