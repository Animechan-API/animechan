const database = require('../config/mongo');
const Quote = require('../model/quote');

const SEED_DATA = require('./test-data.json');
const MONGO_URI = process.env.MONGO_READ_WRITE_URI_DEV;

database.connect(MONGO_URI).then(() => {
	console.log(`Connected to database successfully on ${MONGO_URI} 🚀`);
});

const seed = async () => {
	try {
		await Quote.deleteMany({});
		data = await Quote.insertMany(SEED_DATA);
		console.log(`${data.length} records seeded successfully 🌱`);
	} catch (err) {
		console.error('Error seeding data: ', err);
	}
};

(async () => {
	await seed();
	await database.disconnect();
	console.log('Disconnected from database successfully 👋');
})();
