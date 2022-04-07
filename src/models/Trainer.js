const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/dbConn');
const { v4: uuid } = require('uuid');

class Trainer extends Model {}

Trainer.init(
	{
		id: {
			primaryKey: true,
			allowNull: false,
			type: DataTypes.UUID,
		},
		name: {
			type: DataTypes.STRING(44),
			allowNull: false,
		},
	},
	{
		sequelize,
		timestamps: true,
		underscored: true,
	}
);

Trainer.addHook('beforeValidate', trainer => {
	trainer.id = uuid();
});

module.exports = Trainer;
