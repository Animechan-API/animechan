import database from '~/config/mongo';
import Quote from '~/model/quote';
import SEED_DATA from '~/scripts/test-data.json';

const MONGO_URI = process.env.MONGO_READ_WRITE_URI_DEV as string;

database.connect(MONGO_URI).then(() => {
	console.log(`Connected to database successfully on ${MONGO_URI} 🚀`);
});

const seed = async () => {
	try {
		await Quote.deleteMany({});
		const data = await Quote.insertMany(SEED_DATA);
		// @ts-ignore
		console.log(`${data?.length} records seeded successfully 🌱`);
	} catch (err) {
		console.error('Error seeding data: ', err);
	}
};

(async () => {
	await seed();
	await database.disconnect();
	console.log('Disconnected from database successfully 👋');
})();
