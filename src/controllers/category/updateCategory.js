const { updateOneCategory } = require('../../services/categoryService');
module.exports = async (courseId, updates) => {
	try {
		const updatedCategory = await updateOneCategory(courseId, updates, true);
		return updatedCategory;
	} catch (err) {
		throw new Error('Database Error!');
	}
};
