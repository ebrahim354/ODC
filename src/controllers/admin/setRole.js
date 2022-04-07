const { updateAdmin } = require('../../services/adminService');
const sendEmail = require('../../utils/sendEmail');
const { envEmail } = require('../../utils/config');
const { ROLES } = require('../../constants');

module.exports = async (targetId, role) => {
	try {
		if (!ROLES[role]) {
			console.log('role: ', role);
			throw new Error('Invalid role!');
		}

		const admin = await updateAdmin(
			targetId,
			{
				role,
			},
			true
		);
		console.log('admin: ', admin);
		const text = `
      you are assigned as ${role} for the ODC project.
    `;
		const subject = `you are assigned as ${role} for ODC`;
		console.log(envEmail);
		await sendEmail(admin.email, envEmail, subject, text);

		delete admin.password;
		return admin;
	} catch (error) {
		console.log(error);
		throw new Error('Invalid input');
	}
};
