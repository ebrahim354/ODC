const {
	CODE_INVALID_REQUEST,
	CODE_SUCCESSFULL,
	STUDENT_ROUTE,
	STUDENT_REGISTER_ROUTE,
} = require('../src/constants');
const MAIN_ROUTE = `${STUDENT_ROUTE}${STUDENT_REGISTER_ROUTE}`;
const app = require('../src/app');
const supertest = require('supertest');
const {
	DiscconectFromDataBase,
	ConnectToDataBase,
} = require('../src/utils/dbConn');

const success = CODE_SUCCESSFULL;
const invalidRequest = CODE_INVALID_REQUEST;

const App = supertest(app);

beforeAll(async () => {
	await ConnectToDataBase();
	console.log('connected to database!');
});

describe('testing valid cases', () => {
	it('can send a sign up request with valid data', async () => {
		const data = {
			password: '12345678',
			email: 'testingValidEmail@gmail.com',
			phone: '01011111111',
			address: 'somerandomaddress',
			college: 'nocollege:(',
			name: 'safasd',
		};
		const res = await App.post(MAIN_ROUTE).send(data).expect(success);
		console.log(res.error);

		expect(res.body.data.token).toBeDefined();
		expect(res.body.data.errors).toBeFalsy();
	}, 30000);
});

describe('testing invalid requests', () => {
	it("can't sign up with messing required fields", async () => {
		const data = {
			password: '111',
		};
		const res = await App.post(MAIN_ROUTE).send(data).expect(invalidRequest);

		expect(res.body.errors).toBeDefined();
		expect(res.body.data).toBeFalsy();
	});
});

afterAll(async () => {
	await DiscconectFromDataBase();
	console.log('ended');
});
