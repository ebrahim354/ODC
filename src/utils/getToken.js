const getToken = req => {
	let token;
	const auth = req.header('Authorization');
	if (auth && auth.startsWith('Bearer ')) token = auth.substr(7);

	return token;
};

module.exports = getToken;
