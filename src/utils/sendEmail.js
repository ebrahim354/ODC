const { apiMailKey } = require('./config');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(apiMailKey);

module.exports = async (to, from, subject, text) => {
	try {
		const msg = {
			to,
			from,
			subject,
			text,
		};
		await sgMail.send(msg);
	} catch (err) {
		console.log(err);
		throw new Error('External api error');
	}
};
