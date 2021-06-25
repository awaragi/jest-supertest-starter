const Client = require('./client');

class ClientAuthenticated extends Client {
    constructor(authorizationBearerToken, headers = {}) {
        super(Object.assign({}, {
            "Authorization": `Bearer ${authorizationBearerToken}`
        }, headers));
    }
}

module.exports = ClientAuthenticated;
