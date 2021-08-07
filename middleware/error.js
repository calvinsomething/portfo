const winston = require('winston');

module.exports = (err, req, res, next) => {
    // Pass full error object as meta data.
    winston.error('', err);
    res.status(500).send({ error: 'Something failed.' });
};