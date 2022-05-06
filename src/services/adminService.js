const { Admin, Category } = require('../models');

const getOneAdmin = async data => {
	const admin = await Admin.findOne({
		where: {
			...data,
		},
		raw: true,
	});
	return admin;
};

const addCategory = async (data, returning = false) => {
	console.log('hello', data);
	try {
		const newCategory = await Category.create(data, {
			returning,
		});
		console.log('bey');
		return returning ? newCategory : undefined;
	} catch (err) {
		console.log(err);
	}
};

///////////////////
const getManyAdmins = async () => {
	const admins = await Admin.findAll({
		attributes: {
			exclude: ['password'],
		},
		raw: true,
	});
	return admins.map(a => a);
};

const addAdmin = async (data, returning = false) => {
	try {
		const newAdmin = await Admin.create(data, {
			returning,
		});
		return returning ? newAdmin : undefined;
	} catch (err) {
		console.log('there is an error on the database');
		console.log(err);
	}
};

const updateAdmin = async (id, updates, returning = true) => {
	try {
		const [, rows] = await Admin.update(updates, {
			where: {
				id,
			},
			returning,
		});

		return returning ? rows[0] : undefined;
	} catch (err) {
		console.log(err);
		throw new Error('unAuthorzied!');
	}
};

const deleteAdmin = async id => {
	const result = await Admin.destroy({
		where: {
			id,
		},
	});
	return !!result;
};

module.exports = {
	getOneAdmin,
	getManyAdmins,
	addAdmin,
	updateAdmin,
	deleteAdmin,
	addCategory,
};
