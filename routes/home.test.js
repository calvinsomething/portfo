const request = require('supertest');
const { context } = require('./home');

describe('GET /', () => {
    let server;
    beforeEach(() => {
        server = require('../index');
    });
    afterEach(async () => {
        await server.close();
    });

    it('should return status 200', async () => {
        const res = await request(server).get('/');
        expect(res.status).toBe(200);
    });

    it('should return templated html', async () => {
        const res = await request(server).get('/');
        expect(res.text).toMatch(new RegExp(`${context}`));
    });
});
