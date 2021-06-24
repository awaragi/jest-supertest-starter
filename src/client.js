const request = require('supertest');

const baseUrlEnvName = 'BASE_URL';

module.exports = () => {
    // get base url from environment
    const baseUrl = process.env[baseUrlEnvName];
    if(baseUrl === undefined) {
        throw new Error(`Missing ${baseUrlEnvName} environment variable!`);
    }
    return request(baseUrl);
}