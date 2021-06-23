# POC-jest-supertest-starter
>Starter template/project that can be used to start performing API integration testing using JEST and Supertest (with support to multi environments)

## Table of Contents
<!-- npx markdown-toc -i README.md -->

<!-- toc -->

- [Technologies](#technologies)
- [API](#api)
- [Clean code](#clean-code)
- [Sample tests](#sample-tests)

<!-- tocstop -->

## Technologies
* Jest
* Supertest
* Prettier
* ESLint

## API
All API under test are mapped using re-usable library. The approach I recommend for creating reusable API for testing 
purposes is as follows:
* Write a test/spec calling directly the API to incorporate
* Once API is stable, refactor the code calling the test to src/api structure
* Ensure that the existing test/spec are still passing (TTD for Testing :) )

## Clean code
Usage of ESLint is fundamental for clean code (test code included). It is strongly recommended to include pre-commit 
hooks to ensure that linting and formatting are applied regularly and in a consistent manner. This author of this project
believe in choice thus only the recipe will be provided here (see <https://github.com/typicode/husky> for more details 
and documentation)
```shell
npm install husky --save-dev
npx husky install
npx husky add .husky/pre-commit "npm lint && npm format"
```

## Sample tests
We will be using https://reqres.in/ as an API to demonstrate the patterns to use in this project.