const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/dbConn');
const Category = require('./Category');
const { v4: uuid } = require('uuid');

class Course extends Model {}

Course.init(
	{
		id: {
			primaryKey: true,
			allowNull: false,
			type: DataTypes.UUID,
		},
		name: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
		level: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		category: {
			type: DataTypes.UUID,
			allowNull: false,
			onDelete: 'CASCADE',
			references: {
				model: Category,
				key: 'id',
			},
		},
	},
	{
		sequelize,
		timestamps: true,
		underscored: true,
	}
);

Course.addHook('beforeValidate', course => {
	course.id = uuid();
});

module.exports = Course;
