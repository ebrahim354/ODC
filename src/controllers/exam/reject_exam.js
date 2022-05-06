const { rejectExam } = require('../../services/examService');
const { getOneStudent } = require('../../services/studentService');
const { getCourse } = require('../../services/courseService');
const sendEmail = require('../../utils/sendEmail');
const sendSMS = require('../../utils/sendSMS');
const { envEmail } = require('../../utils/config');

module.exports = async (examId, adminId, { maxDegree, minDegree, degree }) => {
	try {
		const [revision, studentId, courseId] = await rejectExam(examId, adminId, {
			maxDegree,
			minDegree,
			degree,
		});
		const student = await getOneStudent({ id: studentId });
		const course = await getCourse(courseId);
		const to = student.email;
		const from = envEmail;
		const subject = `you got rejected for course ${course.name}`;
		const text = `
    You got rejected for the course ${course.name} after failing the enroll exam ,
    you can view your degree and other information on the ODC website after loging in.
    you can re enroll on the same course or other courses now,
    hard luck next time.
    `;

		await sendEmail(to, from, subject, text);
		await sendSMS(student.phone, text);
		return revision;
	} catch (err) {
		console.log(err);
		throw err;
	}
};
