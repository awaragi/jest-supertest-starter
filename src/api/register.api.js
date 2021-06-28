/**
 * Register API wrapper class
 */
class RegisterApi {
  constructor(client) {
    this.client = client;
  }

  /**
   * Generate payload for registration
   * @param email
   * @param password
   * @returns {{password, email}}
   */
  generatePayload(email, password) {
    return {
      email,
      password,
    };
  }

  /**
   * register a user
   * @param payload
   * @returns {Promise<{id, token}>}
   */
  async register(payload) {
    const response = await this.client.request.post("/api/register").send(payload);
    expect(response.status).toBe(200);
    let body = response.body;
    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("token");
    return body;
  }
}

module.exports = RegisterApi;
