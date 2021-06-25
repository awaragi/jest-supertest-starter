/**
 * Register API wrapper class
 */
class RegisterApi {
  constructor(client) {
    this.client = client;
  }

  /**
   * register a user
   * @param email
   * @param password
   * @returns {Promise<{id, token}>}
   */
  async register(email, password) {
    const response = await this.client.request.post("/api/register").send({
      email,
      password,
    });
    expect(response.status).toBe(200);
    let body = response.body;
    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("token");
    return body;
  }
}

module.exports = RegisterApi;
