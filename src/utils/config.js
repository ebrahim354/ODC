require('dotenv').config();
console.log('Evnironmental vars are configured!');

const port = process.env.SERVER_PORT;
const db = process.env.DB_URL;
const salt = process.env.SALT_ROUNDS;
const secret = process.env.PRIVATE_KEY;
const apiMailKey = process.env.API_MAIL_KEY;
const envEmail = process.env.EMAIL;

if (!port || !db || !salt || !secret || !apiMailKey || !envEmail)
	throw new Error('Environmental variables error!');

module.exports = {
	port,
	db,
	salt,
	secret,
	apiMailKey,
	envEmail,
};
