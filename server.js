const fs = require('fs');
const https = require('https');
const winston = require('winston');

const app = require('./app');

const PORT = process.env.PORT;
if (!PORT) throw new Error('Must define "PORT" env variable.');

const server = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/calvinsomething.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/calvinsomething.com/fullchain.pem')
}, app);

server.listen(PORT, () => winston.info(`Listening on port ${PORT}...`));
