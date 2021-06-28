# jest-supertest-starter
>Starter template/project that can be used to start performing API integration testing using JEST and Supertest (with support to multi environments)

> This template/project is targeted to Microservice/API developers and Automation Quality Assurance (QA) developers. The author makes certain assumptions to ensure that the technical requirements are correctly set to ensure success while keeping the resulting code at high level of quality.

## Table of Contents
<!-- npx markdown-toc -i README.md -->

<!-- toc -->

- [Built with](#built-with)
- [Tested with](#tested-with)
- [Folder structure](#folder-structure)
- [Clean code](#clean-code)
- [API Abstraction layer](#api-abstraction-layer)
- [Handling multiple target environments](#handling-multiple-target-environments)
- [Data driven testing](#data-driven-testing)
- [Story outline](#story-outline)
- [DRY Do not Repeat Yourself](#dry-do-not-repeat-yourself)
- [Typescript](#typescript)
  * [Extensions](#extensions)
  * [Configure Typescript](#configure-typescript)

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
      lib/
        domain.validations.js
        ...
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
All API under test can be made available using re-usable abstraction library. The recommended approach for creating reusable API for testing purposes is as follows:
* Write an explicit test/spec calling directly the API
* Once API calls have stabilised, refactor reusable api calls into src/api (restrict to positive APIs)
  * centralize environment handling in a client/connection class
* Ensure that the existing test/spec are still passing (TTD for Testing	😀)
* If input to multiple API functions involves large number of parameters (complex API input), consider splitting the API functions into API calls plus one or more generatePayload functions.

>Important to keep the API abstraction layer to only positive flow (happy path). They should in general do both input validation and basic API response validations to be useful.

> In other words, only port to API abstraction layer APIs that is re-usable in more than a single test

## Handling multiple target environments
Use <src/env/> folder to setup multiple target environments. Setup reference to those environments in your 
<package.json> by prefixing TARGET=xxx in your test:* scripts. These variables can be used in the various library functions (client, API, etc.).

## Data driven testing
Data Driven Testing is outside the scope of this starter project however:
* the <src/test/users.feature/users.spec.js> contains a DDT test using JSON source file.
* There are many CSV parsers that can be used to loaded data from a CSV file.
* There are many database drivers that can be used to fetch data to be used as source for DDT. 

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
* See <src/test/register.feature/register.spec.js> for combining API in complex tests
  * Although simplistic, <src/api/register.api.js> demonstrate separation of payload from API call

## DRY Do not Repeat Yourself
The DRY principle is an important principle and in the author opinion one that leads to maintainable and evolutionary codebase. Here are some cases where refactor to centralise might come in handy.
* If same validation gets duplicated from one test case to another, consider extracting into a common function (see <src/test/lib/auth.validations.js>)
* If some payload construction is duplicated from one API method to another, consider extracting into a common function (see <src/api/register.api.js>)

## Typescript
The author of this template is strongly in favor of using Typescript for all javascript development projects. However, experience, and the targeted audience dictated the decision that go the pure Javascript route.

Should you or your team are more comfortable with Typescript. Here are the steps you can take to migrate to Typescript:

### Extensions
* Rename API and Test cases extensions to .ts (do not alter .js configuration dot files)
* Add/Rename extensions in jest.config.js

### Configure Typescript
* Add the following dependencies:
```shell
yarn add typescript ts-node 
yarn add -D @types/typescript
```
* Add a Typescript configuration (tsconfig.js) to root folder
```json
{
    "compilerOptions": {
        "module": "commonjs",
        "esModuleInterop": true,
        "target": "es6",
        "noImplicitAny": true,
        "moduleResolution": "node",
        "sourceMap": true,
        "outDir": "out/tsc",
        "baseUrl": "./src",
        "paths": {
            "*": [
                "node_modules/*"
            ]
        }
    },
    "include": [
        "src/**/*"
    ],
    "exclude": ["node_modules", "out"]
}
```
* Update Typescript transformation in jest.config.js
```json
{
  "transform": {
    "^.+\\.ts$": "ts-jest"
  },
  "moduleFileExtensions": ["js", "json", "ts"],
  "testMatch": ["<rootDir>/src/test/**/*.{spec,test}.{js,ts}"]
}
```