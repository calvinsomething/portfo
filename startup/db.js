const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
    const DB = process.env.DB;
    mongoose.connect(DB, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
        .then(() => winston.info(`Connected to ${DB}.`));
};