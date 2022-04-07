const { addCategory } = require('../../services/categoryService');

module.exports = async name => {
	try {
		const newCategory = await addCategory({ name }, true);
		return newCategory;
	} catch (err) {
		throw new Error('Invalid input');
	}
};
