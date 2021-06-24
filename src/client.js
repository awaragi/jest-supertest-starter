const request = require('supertest');
const defaults = require('superagent-defaults');

const baseUrlEnvName = 'BASE_URL';

class Client
{
    constructor(standardHeaders = {
        "Content-Type": "application/json"
    }) {
        // get base url from environment
        const baseUrl = process.env[baseUrlEnvName];
        if (baseUrl === undefined) {
            throw new Error(`Missing ${baseUrlEnvName} environment variable!`);
        }
        this.superagent = request(baseUrl);
        this.request = defaults(this.superagent);

        this.setupHeaders(standardHeaders);
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