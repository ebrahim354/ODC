const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/dbConn');
const Exam = require('./Exam');
const Student = require('./Student');
const { v4: uuid } = require('uuid');
const Admin = require('./Admin');

class Revision extends Model {}

Revision.init(
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
		reviewdBy: {
			type: DataTypes.UUID,
			allowNull: false,
			onDelete: 'CASCADE',
			references: {
				model: Admin,
				key: 'id',
			},
		},
		exam: {
			type: DataTypes.UUID,
			allowNull: false,
			onDelete: 'CASCADE',
			references: {
				model: Exam,
				key: 'id',
			},
		},
		maxDegree: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		minDegree: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		degree: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
	},
	{
		sequelize,
		timestamps: true,
		underscored: true,
	}
);

Revision.addHook('beforeValidate', revision => {
	revision.id = uuid();
});

module.exports = Revision;
