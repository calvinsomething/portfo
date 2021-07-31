const express = require('express');

const app = express();
require('dotenv').config();

require('./startup/logging')(app);
require('./startup/db')();
require('./startup/settings')(app);
require('./startup/middleware')(app);
require('./startup/routes')(app);

module.exports = app;