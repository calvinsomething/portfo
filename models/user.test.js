const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const getStockPrice = require('../services/stock_pricer');
const User = require('./user');

jest.mock('../services/stock_pricer');

describe('User model', () => {

    let testUser;
    const expected = {
        name: 'Test',
        external_id: 123
    };

    beforeEach(async () => {
        testUser = new User(expected);
        await testUser.save();
        getStockPrice.mockResolvedValue(10);
    });

    afterEach(async () => {
        await User.collection.drop();
        delete expected.stocks;
        delete expected.balance;
    });

    it('should add stocks to account when purchased', async () => {
        await testUser.buy('AMZN', 3);
        expected.stocks = {
            symbol: 'AMZN',
            quantity: 3,
            totalCost: 30
        };
        expect(testUser.stocks).toEqual(expect.arrayContaining([expect.objectContaining(expected.stocks)]));
    });

    it('should increase spent by amount equal to purchased stocks', async () => {
        await testUser.buy('TEST', 10);
        expect(testUser.spent).toBe(100);
    });

    it('should reduce spent by amount equal to sold stocks', async () => {
        testUser.spent = 100;
        await testUser.save();
        await testUser.sell('TEST', 10);
        expect(testUser.spent).toBe(0);
    });
});