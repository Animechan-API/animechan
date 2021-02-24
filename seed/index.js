require('dotenv').config();
const Quote = require('../model/quote');
const seedDatabase = require('./seeder');
const db = require('./quote.json');
const database = require('../config/mongo');

(async () => {
  const connection = await database.connect(process.env.MONGO_URI_DEV);
  await seedDatabase(Quote, db);
  await connection.close();
  // eslint-disable-next-line no-console
  console.log('Database seeded!');
})();
