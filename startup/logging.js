// const morgan = require('mongoose-morgan');
const morgan = require('morgan');
const winston = require('winston');
require('express-async-errors');
require('winston-mongodb');

module.exports = (app) => {
    if (process.env.NODE_ENV !== 'production') {
        winston.add(new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            ),
            handleExceptions: true,
            handleRejections: true
        }));
    }
    winston.add(new winston.transports.MongoDB({
        db: process.env.DB,
        collection: 'winston',
        level: 'warn',
        format: winston.format.simple(),
        handleExceptions: true,
        handleRejections: true
    }));

    // app.use(morgan({
    //     collection: 'morgan',
    //     connectionString: process.env.DB,
    //     //user: 'admin',
    //     //pass: 'test12345'
    //    }
    // ));

    if (process.env.NODE_END !== 'production') app.use(morgan('common'));
};