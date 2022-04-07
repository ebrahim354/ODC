const { acceptExam } = require('../../services/examService');
const { getOneStudent } = require('../../services/studentService');
const { getCourse } = require('../../services/courseService');
const sendEmail = require('../../utils/sendEmail');
const { envEmail } = require('../../utils/config');

module.exports = async (examId, adminId, { maxDegree, minDegree, degree }) => {
	try {
		const [revision, studentId, courseId] = await acceptExam(examId, adminId, {
			maxDegree,
			minDegree,
			degree,
		});
		const student = await getOneStudent({ id: studentId });
		const course = await getCourse(courseId);
		const to = student.email;
		const from = envEmail;
		const subject = `you got accepted for course ${course.name}`;
		const text = `
    You got accepted for the course ${course.name} after passing the enroll exam ,
    you can view your degree and other information on the ODC website after loging in.
    Congratulations!
    `;

		await sendEmail(to, from, subject, text);
		return revision;
	} catch (err) {
		console.log(err);
		throw err;
	}
};
