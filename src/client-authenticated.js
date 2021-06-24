const Client = require('./client');

class ClientAuthenticated extends Client {
    constructor(authorizationBearerToken, standardHeaders = {}) {
        const headers = {};
        Object.assign(headers, standardHeaders);
        Object.assign(headers, {
            "Authorization": `Bearer ${authorizationBearerToken}`
        });
        super(headers);
    }
}

module.exports = ClientAuthenticated;
