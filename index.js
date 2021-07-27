const express = require('express');
const winston = require('winston');

const app = express();
require('dotenv').config();

require('./startup/logging')();
require('./startup/settings')(app);
require('./startup/middleware')(app);
require('./startup/routes')(app);

const PORT = process.env.PORT || 3000;

module.exports = app.listen(PORT, () => winston.info(`Listening on port ${PORT}...`));