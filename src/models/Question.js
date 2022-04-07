const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/dbConn');
const Category = require('./Category');
const { v4: uuid } = require('uuid');

class Question extends Model {}

Question.init(
	{
		id: {
			primaryKey: true,
			allowNull: false,
			type: DataTypes.UUID,
		},
		content: {
			type: DataTypes.STRING(200),
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

Question.addHook('beforeValidate', question => {
	question.id = uuid();
});
module.exports = Question;
