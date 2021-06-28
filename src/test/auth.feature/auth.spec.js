const request = require("supertest");
const Client = require("../../client");
const AuthApi = require("../../api/auth.api");
const authValidations = require('../lib/auth.validations');

let client;
let authApi;
beforeAll(async () => {
  client = new Client();
  authApi = new AuthApi(client);
});

describe("1. Login API", () => {
  it("1. should allow login using correct credentials (explicit target and endpoint API test - AVOID)", async () => {
    let response = await request("https://reqres.in").post("/api/login").send({
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    });
    expect(response.status).toBe(200);
    let body = response.body;
    expect(body).toHaveProperty("token");
    let token = body.token;
    authValidations.validateToken(token);
  });
  it("2. should allow login using correct credentials (using client for implicit target environment but using explicit endpoints)", async () => {
    let response = await client.request.post("/api/login").send({
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    });
    expect(response.status).toBe(200);
    let body = response.body;
    expect(body).toHaveProperty("token");
    let token = body.token;
    authValidations.validateToken(token);
  });
  it("3. should fail login using incorrect credentials (direct call to avoid complicating API abstraction)", async () => {
    let response = await client.request.post("/api/login").send({
      email: "eve.holt@reqres.in",
    });
    expect(response.status).toBe(400);
    let body = response.body;
    expect(body).toHaveProperty("error");
    let error = body.error;
    expect(typeof error).toBe("string");
    expect(error).toBe("Missing password");
  });
  it("4. should allow login using correct credentials (using API library)", async () => {
    let token = await authApi.login("eve.holt@reqres.in", "cityslicka");
    // standard validations
    authValidations.validateToken(token);
    // specific test validations
    expect(token).toMatch(/[a-zA-Z0-9]+/);
  });
});
