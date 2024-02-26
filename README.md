## Introduction 📖

This repository showcases a framework built with Cypress for the
**Mission control dashboard full stack demo app**: [https://github.com/odziem/nasa-project](https://github.com/odziem/nasa-project).
It includes end-to-end tests, UI integration tests, and API integration tests.The framework follows the Page Object Model (POM) design. Additionally, the `commands.ts` file includes custom commands serving as an additional abstraction layer. The `utils.ts` file contains utilty functions.


## DB state reset/test data preparation 🗃️

In terms of test data preparation, Mongo database state management is implemented through actions such as dropping, creating, and populating collections before tests. The `dropAllCollections` and `populateDB` functions
utilizing the Mongoose ORM package handle cleaning and seeding test data. These functions are encapsulated within Cypress tasks for convenient access within spec files.


## Running Locally 🖥️

To run the tests locally:

1. Clone the project locally.
2. Run `npm install` to install the necessary dependencies.
3. Create a `.env` file in the root directory (check `.env.example` in the project root to see what needs to be included).


## Running in Docker Container 🐳

To run the tests in Docker container:
1. Run `docker build -t your-docker-image-name .` in order to build docker image
2. Run `docker run your-docker-image-name npm run script-name` in order to run specific npm script in Docker container
   

## Available Scripts 🧪

- To run all specs files': `npm run all-tests`
- To run all e2e tests in Chrome: `npm run e2e-tests:chrome`
- To run all e2e tests in Edge: `npm run e2e-tests:edge`
- To run all e2e tests in Mozilla Firefox: `npm run e2e-tests:firefox`
  
- To run individual e2e test spec files:
  - To run in 'Google Chrome':
   - `npm run launch-e2e:chrome`
   - `npm run navigation-e2e:chrome`
  - To run in 'Mozilla Firefox':
   - `npm run launch-e2e:firefox`
   - `npm run navigation-e2e:firefox`
  - To run in 'Edge':
   - `npm run launch-e2e:edge`
   - `npm run navigation-e2e:edge`
     
- To run all UI integration tests: `npm run ui-integration-tests`
- To run all API integration tests: `npm run api-integration-tests`
  


   ## Test Run Reports 📊

     After running the tests, the `cypress-mochawesome-reporter` generates the `reports` folder with detailed HTML reports. These reports provide insights into test results, including passed, failed, and skipped tests, along with detailed logs and screenshots.
