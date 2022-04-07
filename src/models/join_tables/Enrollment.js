const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../utils/dbConn');
const Student = require('../Student');
const Course = require('../Course');
const { v4: uuid } = require('uuid');

class Enrollment extends Model {}

Enrollment.init(
	{
		id: {
			primaryKey: true,
			allowNull: false,
			type: DataTypes.UUID,
		},
		student: {
			type: DataTypes.UUID,
			allowNull: false,
			onDelete: 'CASCADE',
			references: {
				model: Student,
				key: 'id',
			},
		},
		course: {
			type: DataTypes.UUID,
			allowNull: false,
			onDelete: 'CASCADE',
			references: {
				model: Course,
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

Enrollment.addHook('beforeValidate', enrollment => {
	enrollment.id = uuid();
});

module.exports = Enrollment;
