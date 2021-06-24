const request = require('supertest');
const client = require('../../client');
const UserApi = require('../../api/users.api');

describe('User Listing API', () => {
    it('should list all users (explicit target and endpoint API test)', async () => {
        let response = await request('https://reqres.in').get('/api/users?page=1');
        expect(response.status).toBe(200);
        let body = response.body;
        expect(body.page).toBe(1);
        expect(body.per_page).toBe(6);
        expect(body.total).toBe(12);
        let data = body.data;
        expect(data).toHaveLength(6);
        let user1 = require('./user1.json');
        let user2 = require('./user2.json');
        expect(data[0]).toEqual(user1);
        // example for when data is not ordered where we have too use find by id
        expect(data.find(u => u.id === 2)).toEqual(user2);
        // DO SOMETHING WITH DATA
    });
    it('should list all users (using client for implicit target environment but using explicit endpoints)', async () => {
        let response = await client().get('/api/users?page=1');
        expect(response.status).toBe(200);
        let body = response.body;
        expect(body.page).toBe(1);
        expect(body.per_page).toBe(6);
        expect(body.total).toBe(12);
        let data = body.data;
        expect(data).toHaveLength(6);
        let user1 = require('./user1.json');
        let user2 = require('./user2.json');
        expect(data[0]).toEqual(user1);
        // example for when data is not ordered where we have too use find by id
        expect(data.find(u => u.id === 2)).toEqual(user2);
        // DO SOMETHING WITH DATA
    });
    it('should list all users of page 1 (using API library)', async () => {
        const usersApi = new UserApi();
        let data = await usersApi.findAll(1);
        let user1 = require('./user1.json');
        let user2 = require('./user2.json');
        expect(data[0]).toEqual(user1);
        // example for when data is not ordered where we have too use find by id
        expect(data.find(u => u.id === 2)).toEqual(user2);
        // DO SOMETHING WITH DATA
    });
});