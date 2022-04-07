const express = require('express');
const app = express();
const cors = require('cors');
const studentRouter = require('./routers/student');
const adminRouter = require('./routers/admin');
const { STUDENT_ROUTE, ADMIN_ROUTE } = require('./constants');
const errorHandler = require('./utils/errorHandler');
const { getManyCourses } = require('./services/courseService');

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
	const courses = await getManyCourses({}, 10);
	res.status(200).json({
		data: { courses },
		errors: null,
	});
});

app.use(STUDENT_ROUTE, studentRouter);
app.use(ADMIN_ROUTE, adminRouter);

app.use(errorHandler);

module.exports = app;
