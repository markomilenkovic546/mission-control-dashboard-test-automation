## Introduction 📖

This repository showcases a framework built with Cypress for the
**Mission control dashboard full stack demo app**: [https://github.com/odziem/nasa-project](https://github.com/odziem/nasa-project)
It includes end-to-end tests, UI integration tests, and API integration tests.The framework follows the Page Object Model (POM) design. Additionally, the `commands.ts` file includes custom commands serving as an additional abstraction layer. The `utils.ts` file contains utilty functions.


## DB state reset/test data preparation 🗃️

In terms of test data preparation, it's implemented Mongo database state management through actions like dropping, creating, and populating collections before tests. The `dropAllCollections` and `populateDB` functions
utilizing the Mongoose ORM package handle cleaning and seeding test data. These functions are encapsulated within Cypress tasks for convenient access within spec files.
