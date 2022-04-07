const { Model, DataTypes } = require('sequelize');
const Course = require('../Course');
const Trainer = require('../Trainer');
const { sequelize } = require('../../utils/dbConn');
const { v4: uuid } = require('uuid');
const Admin = require('../Admin');

class Teaching extends Model {}

Teaching.init(
	{
		course: {
			type: DataTypes.UUID,
			allowNull: false,
			onDelete: 'CASCADE',
			references: {
				model: Course,
				key: 'id',
			},
			primaryKey: true,
		},
		trainer: {
			type: DataTypes.UUID,
			allowNull: false,
			onDelete: 'CASCADE',
			references: {
				model: Trainer,
				key: 'id',
			},
			primaryKey: true,
		},
		assignedBy: {
			type: DataTypes.UUID,
			allowNull: false,
			onDelete: 'CASCADE',
			references: {
				model: Admin,
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

Teaching.addHook('beforeValidate', teaching => {
	teaching.id = uuid();
});

module.exports = Teaching;
