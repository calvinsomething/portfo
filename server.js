const fs = require('fs');
const http = require('http');
const winston = require('winston');

const app = require('./app');

const PORT = process.env.PORT;
if (!PORT) throw new Error('Must define "PORT" env variable.');

const server = http.createServer(app);

server.listen(PORT, () => winston.info(`Listening on port ${PORT}...`));
