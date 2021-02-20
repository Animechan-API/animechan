require('dotenv').config();
const server = require('./config/server');
const database = require('./config/mongo');

database.connect();
server.connect();
