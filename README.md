# jest-supertest-starter
>Starter template/project that can be used to start performing API integration testing using JEST and Supertest (with support to multi environments)

## Table of Contents
<!-- npx markdown-toc -i README.md -->

<!-- toc -->

- [Built with](#built-with)
- [Tested with](#tested-with)
- [Folder structure](#folder-structure)
- [Clean code](#clean-code)
- [API Abstraction layer](#api-abstraction-layer)
- [Handling multiple target environments](#handling-multiple-target-environments)
- [Data drive testing](#data-drive-testing)
- [Story outline](#story-outline)

<!-- tocstop -->

## Built with
* Jest
* Supertest
* Prettier
* ESLint

## Tested with
[REQ | RES - Sample Test Service](https://reqres.in/) is used to demonstrate the testing patterns to use.

## Folder structure
```
/
  README.md
  package.json
  jest.config.js
  eslintrc
  prettierrc
  src
    /env/
      dev.js
      prod.js
      ...
    /api
      domain1.api.js
      domain2.api.js
      ...
    /test
      domain1/
        _data
        feature1.spec.js
        feature2.spec.js
        ...
      ...
```

## Clean code
Usage of ESLint and prettier is fundamental for clean code (test code included). It is strongly recommended to include pre-commit 
hooks to ensure that linting and formatting are applied regularly and in a consistent manner. This author of this starter template however
believes in free choice thus only the recipe will be provided here (see <https://github.com/typicode/husky> for more details 
and documentation)
```shell
npm install husky --save-dev
npm set-script prepare "husky install"
npm run prepare
npx husky add .husky/pre-commit "npm lint && npm format"
```

## API Abstraction layer
All API under test are mapped using re-usable abstraction library. The recommended approach for creating reusable API for testing
purposes is as follows:
* Write an explicit test/spec calling directly the API
* Once API calls have stablised, refactor reusabe api calls into src/api (restrice to positive APIs)
  * centralize environment handling in a client/connection class
* Ensure that the existing test/spec are still passing (TTD for Testing	😀)

>Important to keep the API abstraction layer to only positive flow (happy path). They should in general do both input validation and basic API response validations to be useful.

> In other words, only port to API abstraction layer APIs that is re-usable in more than a single test

## Handling multiple target environments
Use <src/env/> folder to setup multiple target environments. Setup reference to those environments in your 
<package.json> by prefixing TARGET=xxx in your test:* scripts. These variables can be used in the various library functions (client, API, etc.).

## Data drive testing
Data drive testing is outside the scope of this starter project however:
* the <src/test/users.feature/users.spec.js> contains a DTT test using JSON source file.
* There are many CSV parsers that can be used to loaded data from a CSV file.
* There are many database drivers that can be used to fetch data to be used as source for DTT. 

## Story outline
Here are the Steps to create an API and its associated tests
* See <src/test/auth.feature/auth.spec.js> for logical progression of tests from explicit to api to parameterised
  * login (explicit)
  * login (direct but using standard client)
  * login (direct to test a negative test case)
  * login (implicit using AuthApi)
* See <src/test/users.feature/users.spec.js> for similar progressions
  * Before All
    * Use AuthApi to generate token
    * Create Authenticated Client instance
    * Create User API instance
  * users.findAll
  * users.findById
* See <src/test/register.feature/register.spec.js> for combining API in complexe tests
