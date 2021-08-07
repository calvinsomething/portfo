const express = require('express');
require('express-async-errors');

const app = express();
require('dotenv').config();

require('./startup/logging')(app);
require('./startup/db')();
require('./startup/settings')(app);
require('./startup/security')(app);
require('./startup/middleware')(app);
require('./startup/routes')(app);

module.exports = app;