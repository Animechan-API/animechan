import 'dotenv/config';
import server from './config/server';
import database from './config/mongo';

const MONGO_URI = (
	process.env.NODE_ENV !== 'production'
		? process.env.MONGO_READ_WRITE_URI_DEV
		: process.env.MONGO_READ_URI_PROD
) as string;

database
	.connect(MONGO_URI)
	.then(() => {
		console.log(`Connected to database successfully on ${MONGO_URI} 🚀`);
	})
	.catch((error) => {
		console.log(`Failed to connect to database on ${MONGO_URI} ❌`);
		console.error(error);
	});

server.listen(process.env.PORT, () => {
	console.log(`Live at http://localhost:${process.env.PORT} 🚀`);
});
