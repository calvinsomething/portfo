const winston = require('winston');
require('express-async-errors');

module.exports = () => {
    let consoleLevel = 'error';
    if (process.env.NODE_ENV != 'production')
        consoleLevel = 'info';

    winston.configure({
        transports: [
            new winston.transports.File({
                filename: 'portfo.log',
                level: 'error',
                format: winston.format.simple(),
                handleExceptions: true,
                handleRejections: true
            }),
            new winston.transports.Console({
                level: consoleLevel,
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple(),
                ),
                handleExceptions: true,
                handleRejections: true
            })
        ]
    });
};