const request = require('supertest');
const app = require('../app');

describe('GET /', () => {

    it('should return status 200', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
    });

    it('should return templated html', async () => {
        const res = await request(app).get('/jesting:test');
        expect(res.text).toMatch(/test/);
    });
});