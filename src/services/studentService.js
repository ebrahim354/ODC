const { Student } = require('../models/');
const { sequelize } = require('../utils/dbConn');

const getRevisions = async studentId => {
	try {
		const [revisions] = sequelize.query(`
			select r.id, r.max_degree, r.min_degree, r.created_at, r.degree, a.name, e.state 
			from revisions r 
			join admins a on a.id = r.reviewd_by
			join exams e on e.id = r.exam
			where r.student = '${studentId}';
		`);
		return revisions;
	} catch (err) {
		throw new Error('NOT FOUND!');
	}
};

const getOneStudent = async data => {
	const student = await Student.findOne({
		where: {
			...data,
		},
	});
	console.log('student: ', student);
	return student;
};

const getManyStudents = async filters => {
	const students = await Student.findAll({
		where: {
			...filters,
		},
		attributes: {
			exclude: ['password'],
		},
		raw: true,
	});
	return students.map(s => s);
};

const addStudent = async (data, returning = false) => {
	try {
		console.log('hello');
		const newStudent = await Student.create(data, {
			returning,
		});
		console.log('newStudent', newStudent);
		return returning ? newStudent : undefined;
	} catch (err) {
		console.log('there is an error on the database');
		console.log(err);
	}
};

const updateStudent = async (id, updates, returning = true) => {
	const [, rows] = await Student.update(updates, {
		where: {
			id,
		},
		returning,
	});

	return returning ? rows[0] : undefined;
};

const deleteStudent = async id => {
	const result = await Student.destroy({
		where: {
			id,
		},
	});
	return !!result;
};

module.exports = {
	getOneStudent,
	getManyStudents,
	addStudent,
	updateStudent,
	deleteStudent,
	getRevisions,
};
