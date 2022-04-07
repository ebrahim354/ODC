const { deleteCategory } = require('../../services/categoryService');
module.exports = async categoryId => {
	try {
		const result = await deleteCategory(categoryId);
		return result;
	} catch (err) {
		console.log(err);
		throw new Error('Database Error!');
	}
};
