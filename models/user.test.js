const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const User = require('./user');

// const getStockPrice = jest.fn().mockReturnValue(1000);

describe('User model', () => {

    let testUser;
    const expected = {
        name: 'Test',
        external_id: 123
    };

    beforeEach(async () => {
        testUser = new User(expected);
        await testUser.save();
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
            totalCost: 150000
        };
        expect(testUser.stocks).toEqual(expect.arrayContaining([expect.objectContaining(expected.stocks)]));
    });

    it('should reduce balance by amount equal to purchased stocks', async () => {
        await testUser.buy('TEST', 10);
        expect(testUser.balance).toBe(500000);
    });

    it('should increase balance by amount equal to sold stocks', async () => {
        await testUser.sell('TEST', 10);
        expect(testUser.balance).toBe(1500000);
    });
});