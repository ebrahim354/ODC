const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/dbConn');
const Exam = require('./Exam');
const Question = require('./Question');
const { v4: uuid } = require('uuid');

class ExamQuestion extends Model {}

ExamQuestion.init(
	{
		id: {
			primaryKey: true,
			allowNull: false,
			type: DataTypes.UUID,
		},
		question: {
			onDelete: 'CASCADE',
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Question,
				key: 'id',
			},
		},
		answer: {
			type: DataTypes.STRING,
		},
		exam: {
			onDelete: 'CASCADE',
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Exam,
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

ExamQuestion.addHook('beforeValidate', question => {
	question.id = uuid();
});
module.exports = ExamQuestion;
