const Client = require("../../client");
const ClientAuthenticated = require("../../client-authenticated");
const AuthApi = require("../../api/auth.api");
const UserApi = require("../../api/users.api");
const RegisterApi = require("../../api/register.api");

let anonymous;
let token;
let authenticated;
let authApi;
let usersApi;
let registerApi;
beforeAll(async () => {
  anonymous = new Client();
  registerApi = new RegisterApi(anonymous);
  authApi = new AuthApi(anonymous);
  token = await authApi.login(
    process.env.AUTH_EMAIL,
    process.env.AUTH_PASSWORD
  );
  authenticated = new ClientAuthenticated(token);
  usersApi = new UserApi(authenticated);
});

describe("1. User Registration API", () => {
  it("1. should be able to register and be part of system and login", async () => {
    let email = "eve.holt@reqres.in";
    let password = "pistol";

    const { id } = await registerApi.register(email, password);
    let user = await usersApi.findById(id);
    expect(user.email).toBe(email);
    const token = await authApi.login(email, password);
    expect(token.length).toBeGreaterThan(0);
  });
});
