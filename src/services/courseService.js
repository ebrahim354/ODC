const { Course, Teaching } = require('../models/');
const { sequelize } = require('../models/Student');

const getJoinedCourse = async id => {
	const [result] = await sequelize.query(`
	select c.*, 
	coalesce (array_agg(json_build_object('id',t.id,'name', t.name))
		filter (where t.id is not null), '{}') as trainers
	,json_build_object('id', cat.id, 'name', cat.name) as category 
	from courses c
	left join categories cat on c.category = cat.id 
	left join teachings on c.id = teachings.course
	left join trainers t on t.id = teachings.trainer
	where c.id = '${id}'
	group by t.name,c.id, cat.name, cat.id;
	`);
	console.log('result', result[0]);
	return result[0];
};

const getCourse = async id => {
	const course = await Course.findOne({
		where: {
			id,
		},
		raw: true,
	});
	return course;
};

const getManyCourses = async (filters, limit = undefined) => {
	const courses = await Course.findAll({
		where: {
			...filters,
		},
		limit,
		raw: true,
	});
	return courses;
};

const updateOneCourse = async (id, updates, returning = true) => {
	const [, rows] = await Course.update(updates, {
		where: {
			id,
		},
		returning,
	});

	return returning ? rows[0] : undefined;
};

const deleteCourse = async id => {
	const result = await Course.destroy({
		where: {
			id,
		},
	});
	return !!result;
};

const addCourse = async (data, instructors, returning = false) => {
	try {
		const course = sequelize.transaction(async t => {
			const newCourse = await Course.create(data, {
				returning,
				transaction: t,
			});

			for (let trainer of instructors) {
				await Teaching.create(
					{
						course: newCourse.id,
						trainer,
					},
					{
						transaction: t,
					}
				);
			}
			return newCourse;
		});
		return returning ? course : undefined;
	} catch (err) {
		console.log(err);
	}
};

const assignTrainer = async ({ courseId, trainerId, adminId }) => {
	try {
		await Teaching.create({
			course: courseId,
			trainer: trainerId,
			assignedBy: adminId,
		});
		const course = await getJoinedCourse(courseId);
		return course;
	} catch (err) {
		console.log(err);
		throw new Error('already assigned!');
	}
};

const unassignTrainer = async ({ courseId, trainerId }) => {
	try {
		const result = await Teaching.destroy({
			where: {
				course: courseId,
				trainer: trainerId,
			},
		});
		if (!result) throw new Error('NOT FOUND!');
		const course = await getJoinedCourse(courseId);
		return course;
	} catch (err) {
		console.log(err);
		throw new Error('NOT FOUND!');
	}
};
module.exports = {
	getJoinedCourse,
	getCourse,
	getManyCourses,
	addCourse,
	updateOneCourse,
	deleteCourse,
	assignTrainer,
	unassignTrainer,
};
