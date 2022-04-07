const env = require('./config');
const { Sequelize } = require('sequelize');
const { SequelizeStorage, Umzug } = require('umzug');

const sequelize = new Sequelize(env.db, {
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
	benchmark: true,
});

const runMiagrations = async () => {
	const migrator = new Umzug({
		migrations: {
			glob: 'migrations/*.js',
		},
		storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
		context: sequelize.getQueryInterface(),
		logger: console,
	});
	const migrations = await migrator.up();
	console.log('migrations up to date: ', {
		files: migrations.map(mig => mig.name),
	});
};

const ConnectToDataBase = async () => {
	try {
		await sequelize.authenticate();
		await runMiagrations();
		console.log('connected to the database!');
	} catch (err) {
		console.log(err);
	}
};

const DiscconectFromDataBase = async () => {
	try {
		await sequelize.close();
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	sequelize,
	ConnectToDataBase,
	DiscconectFromDataBase,
};
