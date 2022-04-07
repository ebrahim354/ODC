const {
	Student,
	Admin,
	Category,
	Course,
	Exam,
	Question,
	Revision,
	Trainer,
	Enrollment,
	Teaching,
	ExamQuestion,
	Option,
} = require('../src/models/');

module.exports = {
	up: async ({ context: queryInterface }) => {
		await Student.sync();
		await Admin.sync();
		await Category.sync();
		await Course.sync();
		await Exam.sync();
		await Question.sync();
		await Revision.sync();
		await Trainer.sync();
		await Enrollment.sync();
		await Teaching.sync();
		await ExamQuestion.sync();
		await Option.sync();
		await queryInterface.sequelize.query(
			`insert into
			admins(id, name, email, password, role, image, is_super_admin, created_at, updated_at)
			values('5b19c4aa-1077-471d-9a52-15802f809a8d','admin', 'admin', 'admin', 'admin', 'admin', true, now(), now());`
		);

		const os = await Category.create(
			{
				name: 'os',
			},
			{
				returning: true,
			}
		);
		const networking = await Category.create(
			{
				name: 'networking',
			},
			{
				returning: true,
			}
		);
		const databases = await Category.create(
			{
				name: 'databases',
			},
			{ returning: true }
		);
		const dataStructures = await Category.create(
			{
				name: 'data structures',
			},
			{ returning: true }
		);

		const ahmed = await Trainer.create(
			{
				name: 'Ahemd',
			},
			{ returning: true }
		);

		const mohammed = await Trainer.create(
			{
				name: 'Mohammed',
			},
			{ returning: true }
		);

		const mostafa = await Trainer.create(
			{
				name: 'Mostafa',
			},
			{ returning: true }
		);

		const ebrahim = await Trainer.create(
			{
				name: 'Ebrahim',
			},
			{ returning: true }
		);

		const khaled = await Trainer.create(
			{
				name: 'Khaled',
			},
			{ returning: true }
		);

		const os1 = await Course.create(
			{
				name: 'os 1',
				level: 'first year',
				category: os.id,
			},
			{ returning: true }
		);
		const os2 = await Course.create(
			{
				name: 'os 2',
				level: 'second year',
				category: os.id,
			},
			{ returning: true }
		);
		const os3 = await Course.create(
			{
				name: 'os 3',
				level: 'third year',
				category: os.id,
			},
			{ returning: true }
		);
		const databases1 = await Course.create(
			{
				name: 'databases 1',
				level: 'first year',
				category: databases.id,
			},
			{ returning: true }
		);
		const databases2 = await Course.create(
			{
				name: 'databases 2',
				level: 'second year',
				category: databases.id,
			},
			{ returning: true }
		);
		const databases3 = await Course.create(
			{
				name: 'databases 3',
				level: 'third year',
				category: databases.id,
			},
			{ returning: true }
		);
		const dataStructures1 = await Course.create(
			{
				name: 'data structures 1',
				level: 'first year',
				category: dataStructures.id,
			},
			{ returning: true }
		);
		const dataStructures2 = await Course.create(
			{
				name: 'advanced data structures',
				level: 'second year',
				category: dataStructures.id,
			},
			{ returning: true }
		);
		const networking1 = await Course.create(
			{
				name: 'networking intro',
				level: 'first year',
				category: networking.id,
			},
			{ returning: true }
		);
		const networking2 = await Course.create(
			{
				name: 'advanced networking',
				level: 'forth year',
				category: networking.id,
			},
			{ returning: true }
		);

		await Teaching.create({
			course: os1.id,
			trainer: ahmed.id,
		});
		await Teaching.create({
			course: os2.id,
			trainer: ahmed.id,
		});
		await Teaching.create({
			course: os3.id,
			trainer: khaled.id,
		});
		await Teaching.create({
			course: databases1.id,
			trainer: ebrahim.id,
		});
		await Teaching.create({
			course: databases2.id,
			trainer: mohammed.id,
		});
		await Teaching.create({
			course: databases3.id,
			trainer: mostafa.id,
		});
		await Teaching.create({
			course: networking1.id,
			trainer: ahmed.id,
		});
		await Teaching.create({
			course: networking2.id,
			trainer: mohammed.id,
		});
		await Teaching.create({
			course: dataStructures1.id,
			trainer: mostafa.id,
		});
		await Teaching.create({
			course: dataStructures2.id,
			trainer: khaled.id,
		});

		const question1 = await Question.create(
			{
				content: 'what is your name?',
				category: os.id,
			},
			{ returning: true }
		);
		const question2 = await Question.create(
			{
				content: 'what is your name2?',
				category: databases.id,
			},
			{ returning: true }
		);
		const question3 = await Question.create(
			{
				content: 'what is your name3?',
				category: networking.id,
			},
			{ returning: true }
		);
		const question4 = await Question.create(
			{
				content: 'what is your name4?',
				category: dataStructures.id,
			},
			{ returning: true }
		);
		await Question.create(
			{
				content: 'what is your name5?',
				category: os.id,
			},
			{ returning: true }
		);
		await Question.create(
			{
				content: 'what is your name6?',
				category: dataStructures.id,
			},
			{ returning: true }
		);
		await Question.create(
			{
				content: 'what is your name7?',
				category: networking.id,
			},
			{ returning: true }
		);
		await Question.create(
			{
				content: 'what is your name8?',
				category: databases.id,
			},
			{ returning: true }
		);
		await Question.create(
			{
				content: 'what is your name9?',
				category: os.id,
			},
			{ returning: true }
		);

		Option.create({
			content: 'ahmed',
			question: question1.id,
		});
		Option.create({
			content: 'khaled',
			question: question1.id,
		});

		Option.create({
			content: 'khaled',
			question: question2.id,
		});
		Option.create({
			content: 'khaled',
			question: question2.id,
		});
		Option.create({
			content: 'khaled',
			question: question2.id,
		});

		Option.create({
			content: 'ebrahim',
			question: question4.id,
		});
		Option.create({
			content: 'khaled',
			question: question4.id,
		});
		Option.create({
			content: 'khaled',
			question: question3.id,
		});
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.dropAllTables();
	},
};
