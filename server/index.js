require('dotenv').config();
const server = require('./config/server');
const database = require('./config/mongo');

const MONGO_URI =
	process.env.NODE_ENV !== 'production'
		? process.env.MONGO_URI_DEV
		: process.env.MONGO_READ_URI_PROD;

database.connect(MONGO_URI);
console.log(`Connected to database successfully on ${MONGO_URI} 🚀`);

server.listen(process.env.PORT, () => {
	console.log(`Live at http://localhost:${process.env.PORT} 🚀`);
});
