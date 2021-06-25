class AuthApi {
    constructor(client) {
        this.client = client;
    }
    async login(email, password) {
        const response = await this.client.request.post("/api/login").send({
            email,
            password
        });
        expect(response.status).toBe(200);
        let body = response.body;
        expect(body).toHaveProperty("token");
        let token = response.body.token;
        expect(typeof token).toBe('string');
        return token;
    }
}

module.exports = AuthApi