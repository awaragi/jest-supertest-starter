const request = require('supertest');

module.exports = () => {
    // get base url from environment
    const baseUrl = process.env.TARGET
    if(baseUrl === undefined) {
        throw new Error('Missing TARGET environment variable!');
    }
    return request(baseUrl);
}