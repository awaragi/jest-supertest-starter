const request = require('supertest');
const defaults = require('superagent-defaults');

const defaultHeaders = {
    "Content-Type": "application/json"
};

class Client
{
    constructor(headers = {}) {
        const baseUrl = process.env['BASE_URL'];
        expect(baseUrl).toBeDefined();

        this.superagent = request(baseUrl);
        this.request = defaults(this.superagent);

        this.setupHeaders(Object.assign({}, defaultHeaders, headers));
        this.setupEvents();
    }

    setupHeaders(headers) {
        Object.entries(headers).forEach(entry => {
            const [key, value] = entry;
            this.request.set(key, value);
        });
    }

    setupEvents() {
        if(process.env.DEBUG_REQUESTS === 'true') {
            this.request.on('request', function (req) {
                console.log(req.method, req.url, req.header);
            });
        }
    }
}

module.exports = Client;