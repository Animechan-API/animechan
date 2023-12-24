import 'dotenv/config';
import mongoose from 'mongoose';

const connect = async (mongoUri: string) => {
	try {
		await mongoose.connect(mongoUri, {
			useFindAndModify: false,
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			autoIndex: process.env.NODE_ENV !== 'production',
		});

		mongoose.set('debug', process.env.NODE_ENV !== 'production');
		return mongoose.connection;
	} catch (error) {
		throw error;
	}
};

const disconnect = async () => {
	try {
		await mongoose.disconnect();
	} catch (error) {
		throw error;
	}
};

export default { connect, disconnect };
