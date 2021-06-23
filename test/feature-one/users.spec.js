const request = require('supertest');
const client = require('../../src/client');

describe('User Listing API', () => {
    it('should list all users of page 1 (explicit API test)', async () => {
        let response = await request('https://reqres.in').get('/api/users');
        expect(response.status).toBe(200);
        let body = response.body;
        expect(body.page).toBe(1);
        expect(body.per_page).toBe(6);
        expect(body.total).toBe(12);
        expect(body.data).toHaveLength(6);
        let user1 = require('./user1.json');
        let user2 = require('./user2.json');
        expect(body.data[0]).toEqual(user1);
        // example for when data is not ordered where we have too use find by id
        expect(body.data.find(u => u.id === 2)).toEqual(user2);
    });
    it('should list all users of page 1 (using client to target specific environment)', async () => {
        let response = await client().get('/api/users');
        expect(response.status).toBe(200);
        let body = response.body;
        expect(body.page).toBe(1);
        expect(body.per_page).toBe(6);
        expect(body.total).toBe(12);
        expect(body.data).toHaveLength(6);
        let user1 = require('./user1.json');
        let user2 = require('./user2.json');
        expect(body.data[0]).toEqual(user1);
        // example for when data is not ordered where we have too use find by id
        expect(body.data.find(u => u.id === 2)).toEqual(user2);
    });
});