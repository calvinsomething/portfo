const fs = require('fs');
const https = require('https');
const winston = require('winston');

const app = require('./app');

const PORT = process.env.PORT;
if (!PORT) throw new Error('Must define "PORT" env variable.');

const key = fs.readFileSync('/etc/letsencrypt/live/calvinsomething.com/privkey.pem');
const cert = fs.readFileSync('/etc/letsencrypt/live/calvinsomething.com/fullchain.pem');

winston.info(key);
winston.info(cert);

const server = https.createServer({
    key: key,
    cert: cert
}, app);

server.listen(PORT, () => winston.info(`Listening on port ${PORT}...`));
