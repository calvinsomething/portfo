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

    it('should return templated html', async () => {
        const res = await request(server).get('/jesting:test');
        expect(res.text).toMatch(/test/);
    });
});
