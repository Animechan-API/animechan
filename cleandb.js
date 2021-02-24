require('dotenv').config();
const database = require('./config/mongo');
const Quote = require('./model/quote');

(async () => {
  await database.connect(process.env.MONGO_URI_DEV);
  await Quote.removeCollection();
  await database.disconnect();
  // eslint-disable-next-line no-console
  console.log('Database cleared!');
})();
