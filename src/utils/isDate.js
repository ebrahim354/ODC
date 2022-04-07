module.exports = function (date) {
	return new Date(date) !== 'Invalid Date' && !isNaN(new Date(date));
};
