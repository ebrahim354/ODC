const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/dbConn');
const { v4: uuid } = require('uuid');

class Admin extends Model {}

Admin.prototype.toJSON = function () {
	const attributes = Object.assign({}, this.get());
	delete attributes.password;
	return attributes;
};

Admin.init(
	{
		id: {
			primaryKey: true,
			allowNull: false,
			type: DataTypes.UUID,
		},
		name: {
			type: DataTypes.STRING(55),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
		},
		isSuperAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		sequelize,
		timestamps: true,
		underscored: true,
	}
);

Admin.addHook('beforeValidate', admin => {
	admin.id = uuid();
});

module.exports = Admin;
