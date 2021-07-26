const request = require('supertest');

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
});