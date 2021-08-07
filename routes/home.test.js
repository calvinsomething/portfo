const request = require('supertest');
const app = require('../app');

describe('GET /', () => {

    it('should return status 200', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
    });

    it('should return templated html', async () => {
        const res = await request(app).get('/jesting');
        expect(res.text).toMatch(/jesting/);
    });

    it('should return status 500 for uncaught exception', async () => {
        const res = await request(app).get('/error');
        expect(res.body.error).toMatch('Something failed.');
        expect(res.status).toBe(500);
    });
});