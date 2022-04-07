const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/dbConn');
const { v4: uuid } = require('uuid');

class Student extends Model {
	toJSON() {
		const attributes = Object.assign({}, this.get());
		delete attributes.password;
		return attributes;
	}
}

Student.init(
	{
		id: {
			primaryKey: true,
			allowNull: false,
			type: DataTypes.UUID,
		},
		verification: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(55),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
		},
		phone: {
			type: DataTypes.STRING(55),
			allowNull: false,
			unique: true,
		},
		address: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		college: {
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

Student.addHook('beforeValidate', student => {
	student.id = uuid();
});

module.exports = Student;
