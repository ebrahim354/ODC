const bcrypt = require('bcrypt');
const { envEmail } = require('../../utils/config');
const { addStudent } = require('../../services/studentService');
const generatePassword = require('../../utils/generatePassowrd');
const sendEmail = require('../../utils/sendEmail');

const saltRounds = 10;

module.exports = async student => {
	try {
		// we could remove this part and use the database error instead
		// const emailExists = await getOneUser({ email: student.email });
		// if (emailExists) {
		// 	throw new Error('already taken');
		// }
		student.verification = generatePassword(10);
		const to = student.email;
		const from = envEmail;
		const subject = 'Regestration accepted!';
		const text = `
		you have registered for the ODC program you can't log in unless you enter your verification
		code post it on the route : /student/verify to login
		`;

		const hash = await bcrypt.hash(student.password, saltRounds);
		student.password = hash;
		await addStudent(student, true);

		await sendEmail(to, from, subject, text);
	} catch (error) {
		console.log(error);
		throw new Error('Invalid input');
	}
};
