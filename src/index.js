const env = require('./utils/config');
const http = require('http');
const app = require('./app');
const { ConnectToDataBase } = require('./utils/dbConn');

const server = new http.Server(app);

async function main() {
	await ConnectToDataBase();
	server.listen(env.port || 5000, () => {
		console.log(`server is listening on port: ${env.port} `);
	});
}

main().catch(err => {
	console.log('Upper level error', err.message);
});
