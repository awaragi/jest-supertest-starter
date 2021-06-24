# POC-jest-supertest-starter
>Starter template/project that can be used to start performing API integration testing using JEST and Supertest (with support to multi environments)

## Table of Contents
<!-- npx markdown-toc -i README.md -->

<!-- toc -->

- [Built with](#built-with)
- [Folder structure](#folder-structure)
- [Clean code](#clean-code)
- [Sample tests](#sample-tests)
- [API Abstraction layer](#api-abstraction-layer)
- [Handling multiple target environments](#handling-multiple-target-environments)
- [Steps to create an API and its associated tests](#steps-to-create-an-api-and-its-associated-tests)

<!-- tocstop -->

## Built with
* Jest
* Supertest
* Prettier
* ESLint

## Folder structure
```
/package.json
/jest.config.js
/eslint.json
/prettier.json
/src
  /environments/
    default.js
    prod
    ...
  /api
    domain1.api.js
    domain2.api.js
  /test
    domain1/
      feature1.spec.js
      feature2.spec.js
      ...
```

## Clean code
Usage of ESLint is fundamental for clean code (test code included). It is strongly recommended to include pre-commit 
hooks to ensure that linting and formatting are applied regularly and in a consistent manner. This author of this project
believe in choice thus only the recipe will be provided here (see <https://github.com/typicode/husky> for more details 
and documentation)
```shell
npm install husky --save-dev
npm set-script prepare "husky install"
npm run prepare
npx husky add .husky/pre-commit "npm lint && npm format"
```

## Sample tests
We will be using [REQ | RES - Sample Test Service](https://reqres.in/) to demonstrate the patterns to use in this project.

## API Abstraction layer
All API under test are mapped using re-usable abstraction library. The approach I recommend for creating reusable API for testing
purposes is as follows:
* Write an explicit test/spec calling directly the API to incorporate
* Once API is stable, refactor reusabe api calls src/api
  * centralize environment handling in a client class
* Ensure that the existing test/spec are still passing (TTD for Testing :) )

## Handling multiple target environments
Use <src/env/> folder to setup multiple target environments. Setup reference to those environments in your 
<package.json> by prefixing TARGET=xxx in your test:* scripts. These variables can be used in the various API client 
and library functions

## Steps to create an API and its associated tests
* See <test/feature-one/users.spec.js> for logical progression of tests from explicit to api to parameterised
  * users.findAll
  * users.findById
