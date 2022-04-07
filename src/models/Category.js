const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/dbConn');
const { v4: uuid } = require('uuid');

class Category extends Model {}

Category.init(
	{
		id: {
			primaryKey: true,
			allowNull: false,
			type: DataTypes.UUID,
		},
		name: {
			type: DataTypes.STRING(200),
			allowNull: false,
			unique: true,
		},
	},
	{
		sequelize,
		timestamps: true,
		underscored: true,
	}
);

Category.addHook('beforeValidate', category => {
	category.id = uuid();
});

module.exports = Category;
