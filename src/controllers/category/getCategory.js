const { getOneCategory } = require('../../services/categoryService');
module.exports = async id => {
	try {
		const category = await getOneCategory(id);
		return category;
	} catch (err) {
		console.log(err);
		throw new Error('Database Error!');
	}
};
