const request = require("supertest");
const Client = require("../../client");
const ClientAuthenticated = require("../../client-authenticated");
const AuthApi = require("../../api/auth.api");
const UserApi = require("../../api/users.api");

let token;
let client
let usersApi;
beforeAll(async () => {
  const auth = new AuthApi(new Client());
  token = await auth.login(process.env.AUTH_EMAIL, process.env.AUTH_PASSWORD);
  client = new ClientAuthenticated(token);
  usersApi = new UserApi(client);
})

describe("1. Users Listing API", () => {
  it("1. should list all users (explicit target and endpoint API test - AVOID)", async () => {
    let response = await request("https://reqres.in").get("/api/users?page=1")
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    let body = response.body;
    expect(body.page).toBe(1);
    expect(body.per_page).toBe(6);
    expect(body.total).toBe(12);
    let data = body.data;
    expect(Array.isArray(data)).toBeTruthy();
    expect(data).toHaveLength(6);
    let user1 = require("./_data/user1.json");
    let user2 = require("./_data/user2.json");
    expect(data[0]).toEqual(user1);
    // example for when data is not ordered where we have too use find by id
    expect(data.find((u) => u.id === 2)).toEqual(user2);
  });
  it("2. should list all users (using client for implicit target environment but using explicit endpoints)", async () => {
    let response = await client.request.get("/api/users?page=1");
    expect(response.status).toBe(200);
    let body = response.body;
    expect(body.page).toBe(1);
    expect(body.per_page).toBe(6);
    expect(body.total).toBe(12);
    let data = body.data;
    expect(Array.isArray(data)).toBeTruthy();
    expect(data).toHaveLength(6);
    let user1 = require("./_data/user1.json");
    let user2 = require("./_data/user2.json");
    expect(data[0]).toEqual(user1);
    // example for when data is not ordered where we have too use find by id
    expect(data.find((u) => u.id === 2)).toEqual(user2);
  });
  it("3. should list all users of page 1 (using API library)", async () => {
    let data = await usersApi.findAll(1);
    let user1 = require("./_data/user1.json");
    let user2 = require("./_data/user2.json");
    expect(data[0]).toEqual(user1);
    // example for when data is not ordered where we have too use find by id
    expect(data.find((u) => u.id === 2)).toEqual(user2);
  });
});

describe("2. User Fetch API", () => {
  it("1. should find user by id (explicit target and endpoint API test - AVOID)", async () => {
    let response = await request("https://reqres.in").get("/api/users/1")
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    let body = response.body;
    expect(body).not.toHaveProperty("page");
    expect(body).not.toHaveProperty("per_page");
    let data = body.data;
    expect(typeof data).toBe("object");
    let user1 = require("./_data/user1.json");
    expect(data).toEqual(user1);
  });
  it("2. should find user by id (using client for implicit target environment but using explicit endpoints)", async () => {
    let response = await client.request.get("/api/users/1");
    expect(response.status).toBe(200);
    let body = response.body;
    expect(body).not.toHaveProperty("page");
    expect(body).not.toHaveProperty("per_page");
    let data = body.data;
    expect(typeof data).toBe("object");
    let user1 = require("./_data/user1.json");
    expect(data).toEqual(user1);
  });
  it("3. should find user by id (using API library)", async () => {
    let data = await usersApi.findById(1);
    let user1 = require("./_data/user1.json");
    expect(data).toEqual(user1);
  });
});

describe("3. User Fetch All vs FindById API", () => {
  it("1. should find user by id for each user available (using API library)", async () => {
    let users = await usersApi.findAll(1);
    for (let i = 0; i < users.length; i++) {
      let expected = users[i];
      let user = await usersApi.findById(expected.id);
      expect(user).toEqual(expected);
    }
  });
});
