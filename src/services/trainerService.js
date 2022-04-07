const { Trainer } = require('../models/');
const { sequelize } = require('../models/Student');

const getJoinedTrainer = async id => {
	const [[result]] = await sequelize.query(`
	select t.*, 
	coalesce (array_agg(json_build_object('id',c.id,'name', c.name)) 
		filter (where c.id is not null), '{}') as courses
	from trainers t 
	left join teachings on t.id = teachings.trainer
	left join courses c on c.id = teachings.course
	where t.id = '${id}'
	group by t.id;
	`);
	console.log('result', result);
	return result;
};

const getTrainer = async id => {
	const trainer = await Trainer.findOne({
		where: {
			id,
		},
		raw: true,
	});
	return trainer;
};

const getManyTrainers = async (filters, limit = undefined) => {
	const trainers = await Trainer.findAll({
		where: {
			...filters,
		},
		limit,
		raw: true,
	});
	return trainers;
};

const updateOneTrainer = async (id, updates, returning = true) => {
	const [, rows] = await Trainer.update(updates, {
		where: {
			id,
		},
		returning,
	});

	return returning ? rows[0] : undefined;
};

const deleteTrainer = async id => {
	const result = await Trainer.destroy({
		where: {
			id,
		},
	});
	return !!result;
};

const addTrainer = async (data, instructors, returning = false) => {
	try {
		const trainer = await Trainer.create(data, {
			returning,
		});

		return returning ? trainer : undefined;
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	getJoinedTrainer,
	getTrainer,
	getManyTrainers,
	addTrainer,
	updateOneTrainer,
	deleteTrainer,
};
