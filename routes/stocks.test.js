const axios = require('axios').default;
const request = require('supertest');
const app = require('../app');
const stocksRouter = require('./stocks');

describe('GET /stocks', () => {
    const times = ['8:00', '8:05', '8:10'];
    axios.request = jest.fn().mockResolvedValue({
        data: {
            chart: {
                result: [{
                    timestamp: [
                        1628683200,
                        1628683500,
                        1628683800
                    ],
                    meta: {
                        symbol: 'TEST'
                    },
                    indicators: {
                        quote: [{
                            close: [
                                1.23,
                                3.45,
                                6.78
                            ]
                        }]
                    }
                }]
            }
        }
    });
    it('should return timestamps coverted to hh:mm', async () => {
        const res = await request(app).get('/stocks').query({ symbol: 'TEST' });
        expect(res.body).toMatchObject({ times: times });
    });
});