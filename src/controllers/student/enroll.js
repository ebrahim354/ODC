const { getExams, generateExam } = require('../../services/examService');
const {
	EXAM_STATE: { pending, accepted, inComplete },
	EXAM_SIZE,
} = require('../../constants');
const isExpired = require('../../utils/isExpired');

module.exports = async (courseId, student, limit = EXAM_SIZE) => {
	try {
		//serch on exams for this user (in general even with other courses).
		const exams = await getExams({ student });
		//check on any pending, accepted or in complete exams.
		for (let i = 0; i < exams.length; i++) {
			isExpired(exams[i]);
			if (
				exams[i].state === pending ||
				exams[i].state === accepted ||
				exams[i].state === inComplete
			) {
				throw new Error('Allready enrolled');
			}
		}
		// user is not enrolled we need to create an exam.
		// exams are randomly generated using the course id
		const randomExam = await generateExam(courseId, student, limit);
		//send an email to the student that he has enrolled in an exam.
		//send the new generated exam.
		return randomExam;
	} catch (err) {
		console.log(err);
		throw new Error(err);
	}
};
