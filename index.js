require('dotenv').config();
const server = require('./config/server');
const database = require('./config/mongo');

database.connect(process.env.NODE_ENV !== 'production' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PROD);
server.connect();
