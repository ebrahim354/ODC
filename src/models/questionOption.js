const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/dbConn');
const { v4: uuid } = require('uuid');
const Question = require('./Question');

class Option extends Model {}

Option.init(
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
		question: {
			type: DataTypes.UUID,
			allowNull: false,
			onDelete: 'CASCADE',
			references: {
				model: Question,
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

Option.addHook('beforeValidate', option => {
	option.id = uuid();
});
module.exports = Option;
