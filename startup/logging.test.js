const mongoose = require('mongoose');
const request = require('supertest');
const winston = require('winston');
const app = require('../app');

const MorganLogs = mongoose.model(
    'Morgan',
    new mongoose.Schema({
        date: Date,
        log: String
    }),
    'morgan');
const WinstonLogs = mongoose.model(
    'Winston',
    new mongoose.Schema({
        timestamp: Date,
        level: String,
        message: String
    }),
    'winston');

describe('database logging', () => {

    afterEach(async () => {
        await mongoose.connection.db.collection('winston').deleteMany();
        await mongoose.connection.db.collection('morgan').deleteMany();
    });

    it('should log requests and save to db', async () => {
        await request(app).get('/');
        const timestamp = Date.now();
        const log = await MorganLogs.findOne().sort({ date: -1 });
        const diff = log.date - timestamp;
        expect(log.log).toMatch(/GET \//);
        expect(diff).toBeLessThan(1000);
    });

    it('should save winston logs to db', async () => {
        const timestamp = Date.now();
        winston.info('testing...');
        const log = await WinstonLogs.findOne().sort({ timestamp: -1 });
        const diff = log.timestamp - timestamp;
        expect(log.message).toMatch(/testing.../);
        expect(diff).toBeLessThan(1000);
    });
});