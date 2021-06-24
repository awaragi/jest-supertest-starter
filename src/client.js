const request = require('supertest');

const baseUrlEnvName = 'BASE_URL';

class Client
{
    constructor() {
        // get base url from environment
        const baseUrl = process.env[baseUrlEnvName];
        if (baseUrl === undefined) {
            throw new Error(`Missing ${baseUrlEnvName} environment variable!`);
        }
        this.request = request(baseUrl);
    }
}

module.exports = Client;