const validateToken = (token) => {
  expect(token).toBeDefined();
  expect(typeof token).toBe("string");
  expect(token.length).toBeGreaterThan(0);
  // additional standard validations of tokens (e.g payload)
};

module.exports = {
  validateToken
};
