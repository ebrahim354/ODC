const { Category } = require('../models/');
const { sequelize } = require('../utils/dbConn');

const getOneCategory = async id => {
	const [result] = await sequelize.query(`
		select cat.*, array_agg(json_build_object('id', c.id, 'name',c.name)) as "courses"
		from categories cat 
		left join courses c on c.category = cat.id 
		where cat.id = '${id}' 
		group by cat.id;
	`);
	return result[0];
};

const getManyCategories = async (filters, limit = undefined) => {
	const categories = await Category.findAll({
		where: {
			...filters,
		},
		limit,
		raw: true,
	});
	return categories;
};

const updateOneCategory = async (id, updates, returning = true) => {
	const [, rows] = await Category.update(updates, {
		where: {
			id,
		},
		returning,
	});

	return returning ? rows[0] : undefined;
};

const deleteCategory = async id => {
	const result = await Category.destroy({
		where: {
			id,
		},
	});
	return !!result;
};

const addCategory = async (data, returning = false) => {
	try {
		const newCategory = await Category.create(data, {
			returning,
		});
		return returning ? newCategory : undefined;
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	getOneCategory,
	getManyCategories,
	addCategory,
	updateOneCategory,
	deleteCategory,
};
