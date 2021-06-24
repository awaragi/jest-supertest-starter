module.exports = {
  "moduleFileExtensions": ["js", "json"],
  "modulePathIgnorePatterns": ["<rootDir>/out"],
  "rootDir": "./",
  "testMatch": ["<rootDir>/src/test/**/*.{spec,test}.js"],
  "testPathIgnorePatterns": ["<rootDir>/node_modules", "<rootDir>/out"],
  "testEnvironment": "node",
  "reporters": [
    "default",
    [
      "jest-html-reporters",
      {
        "publicPath": "./out/report",
        "filename": "index.html",
        "expand": false
      }
    ]
  ]
}
