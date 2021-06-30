/**
 * User API wrapper class
 */
class UsersApi {
  constructor(client) {
    this.client = client;
  }
  /**
   * Retrieve paginated list of users
   * @param page
   * @returns {Promise<*>}
   */
  async findAll(page) {
    const response = await this.client.request
      .get(`/api/users`)
      .query({ page });
    expect(response.status).toBe(200);
    let body = response.body;
    expect(body).toHaveProperty("data");
    let data = response.body.data;
    expect(Array.isArray(data)).toBeTruthy();
    return data;
  }

  /**
   * Retrieves a user based on its id
   * @param id
   * @returns {Promise<*>}
   */
  async findById(id) {
    const response = await this.client.request.get(`/api/users/${id}`);
    expect(response.status).toBe(200);
    let body = response.body;
    expect(body).toHaveProperty("data");
    let data = response.body.data;
    expect(typeof data).toBe("object");
    return data;
  }
}

module.exports = UsersApi;
