const { getManyCategories } = require('../../services/categoryService');
module.exports = async (filters, size = undefined) => {
	try {
		const categories = await getManyCategories(filters, size);
		return categories;
	} catch (err) {
		console.log(err);
		throw new Error('Database Error!');
	}
};
