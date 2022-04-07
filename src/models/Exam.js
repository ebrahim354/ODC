const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/dbConn');
const Course = require('./Course');
const Student = require('./Student');
const { v4: uuid } = require('uuid');
const { EXAM_STATE } = require('../constants');

class Exam extends Model {}

Exam.init(
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
		state: {
			type: DataTypes.INTEGER,
			defaultValue: EXAM_STATE.pending,
		},
		expiresIn: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		course: {
			onDelete: 'CASCADE',
			type: DataTypes.UUID,
			allowNull: false,
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

Exam.addHook('beforeValidate', exam => {
	exam.id = uuid();
});

module.exports = Exam;
