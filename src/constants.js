//student
const STUDENT_ROUTE = '/student';
const STUDENT_REGISTER_ROUTE = '/register';
const STUDENT_LOGIN_ROUTE = '/login';
const STUDENT_VERIFY = '/verify';
const STUDENT_ENROLL = '/enroll/:courseId';
const STUDENT_GET_EXAM = '/exam';
const STUDENT_SAVE_ANSWERS = '/save-answers/:examId';
const STUDENT_SUBMIT_EXAM = '/submit/:examId';
const STUDENT_GET_REVISIONS = '/profile';

// admin
const ADMIN_ROUTE = '/admin';
const ADMIN_LOGIN_ROUTE = '/login';
const ADMIN_ALL_STUDENTS = '/students';
const ADMIN_ADD_ADMIN = '/add-admin';

const ADMIN_EXPIRE_EXAMS = '/expire';
const ADMIN_EXPIRE_EXAM = '/expire/:examId';
const ADMIN_SET_EXPIRES_IN = '/expires-in/:examId';

const ADMIN_SET_COURSE = '/course';
const ADMIN_GET_COURSES = '/courses';
const ADMIN_GET_COURSE = '/courses/:courseId';
const ADMIN_UPDATE_COURSE = '/courses/:courseId';
const ADMIN_DELETE_COURSE = '/courses/:courseId';

const ADMIN_ASSIGN_TRAINER = '/assign';
const ADMIN_UNASSIGN_TRAINER = '/unassign';

const ADMIN_SET_TRAINER = '/trainer';
const ADMIN_GET_TRAINERS = '/trainers';
const ADMIN_GET_TRAINER = '/trainers/:trainerId';
const ADMIN_UPDATE_TRAINER = '/trainers/:trainerId';
const ADMIN_DELETE_TRAINER = '/trainers/:trainerId';

const ADMIN_SET_CATEGORY = '/category';
const ADMIN_GET_CATEGORIES = '/categories';
const ADMIN_GET_CATEGORY = '/categories/:categoryId';
const ADMIN_UPDATE_CATEGORY = '/categories/:categoryId';
const ADMIN_DELETE_CATEGORY = '/categories/:categoryId';

const ADMIN_GET_EXAMS = '/pending-exams/:courseId';
const ADMIN_GET_EXAM = '/pending-exam/:examId';
const ADMIN_ACCEPT_EXAM = '/accept/:examId';
const ADMIN_REJECT_EXAM = '/reject/:examId';
const ADMIN_SET_ROLE = '/set-role/:targetId';

//status codes
const CODE_INVALID_REQUEST = 400;
const CODE_SUCCESSFULL = 200;
const CODE_INCORRECT_CREDITS = 401;
const CODE_UNAUTHORIZED = 401;
const CODE_NOT_FOUND = 404;

//questions
const ADMIN_ADD_QUESTION = '/question';
const ADMIN_GET_QUSTIONS = '/questions';
const ADMIN_DELETE_QUESTION = '/questions/:questionId';

//general
const UUID = new RegExp(
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
);
const EXAM_STATE = {
	accepted: 1,
	rejected: 2,
	expired: 3,
	pending: 4,
	inComplete: 5,
};
const EXAM_DURATION = 1000 * 60 * 60 * 24 * 2; // two days in milliseconds.
const EXAM_SIZE = 5;

const ROLES = {
	admin: 1,
	examReviewer: 2,
};

module.exports = {
	ADMIN_ADD_QUESTION,
	ADMIN_GET_QUSTIONS,
	ADMIN_DELETE_QUESTION,

	STUDENT_ROUTE,
	STUDENT_REGISTER_ROUTE,
	STUDENT_VERIFY,
	STUDENT_LOGIN_ROUTE,
	STUDENT_ENROLL,
	STUDENT_GET_EXAM,
	STUDENT_SAVE_ANSWERS,
	STUDENT_SUBMIT_EXAM,
	STUDENT_GET_REVISIONS,

	ADMIN_ROUTE,
	ADMIN_LOGIN_ROUTE,
	ADMIN_ADD_ADMIN,

	CODE_INCORRECT_CREDITS,
	CODE_INVALID_REQUEST,
	CODE_SUCCESSFULL,
	CODE_UNAUTHORIZED,
	CODE_NOT_FOUND,
	ADMIN_ALL_STUDENTS,

	ADMIN_SET_CATEGORY,
	ADMIN_DELETE_CATEGORY,
	ADMIN_GET_CATEGORIES,
	ADMIN_GET_CATEGORY,
	ADMIN_UPDATE_CATEGORY,

	ADMIN_SET_COURSE,
	ADMIN_GET_COURSES,
	ADMIN_GET_COURSE,
	ADMIN_UPDATE_COURSE,
	ADMIN_DELETE_COURSE,

	ADMIN_ASSIGN_TRAINER,
	ADMIN_UNASSIGN_TRAINER,

	ADMIN_SET_TRAINER,
	ADMIN_GET_TRAINERS,
	ADMIN_GET_TRAINER,
	ADMIN_UPDATE_TRAINER,
	ADMIN_DELETE_TRAINER,

	ADMIN_GET_EXAMS,
	ADMIN_GET_EXAM,
	ADMIN_ACCEPT_EXAM,
	ADMIN_REJECT_EXAM,

	UUID,
	EXAM_STATE,
	EXAM_DURATION,
	EXAM_SIZE,

	ADMIN_EXPIRE_EXAMS,
	ADMIN_EXPIRE_EXAM,
	ADMIN_SET_EXPIRES_IN,
	ADMIN_SET_ROLE,

	ROLES,
};
