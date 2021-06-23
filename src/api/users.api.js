const client = require('../client');

class UsersApi {
    async findAll(page) {
        const response = await client().get(`/api/users?page=${page}`);
        expect(response.status).toBe(200);
        let body = response.body;
        expect(body).toHaveProperty('data');
        return response.body.data;
    }
}

module.exports = UsersApi;
