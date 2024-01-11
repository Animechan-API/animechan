import 'dotenv/config';
import server from '~/config/server';

/*
database
	.connect(MONGO_URI)
	.then(() => {
		console.log(`Connected to database successfully on ${MONGO_URI} 🚀`);
	})
	.catch((error) => {
		console.log(`Failed to connect to database on ${MONGO_URI} ❌`);
		console.error(error);
	});
*/

server.listen(process.env.PORT, () => {
	console.log(`Live at http://localhost:${process.env.PORT} 🚀`);
});
