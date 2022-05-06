const { sid, phonToken, envPhone } = require('./config');
const twilio = require('twilio')(sid, phonToken);

module.exports = async (phoneNumber, message) => {
	const sentMessage = await twilio.messages.create({
		body: message,
		from: envPhone,
		to: `+${phoneNumber}`,
	});
	console.log(sentMessage);
};
