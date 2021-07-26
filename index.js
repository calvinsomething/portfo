const express = require('express');

const app = express();
require('dotenv').config();

require('./startup/settings')(app);
require('./startup/middleware')(app);
require('./startup/routes')(app);

const PORT = process.env.PORT || 3000;

module.exports = app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));