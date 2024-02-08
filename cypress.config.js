const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    specPattern: "cypress/specs/**/*.cy.{js,jsx,ts,tsx}",
    testIsolation: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    baseUrl: "http://localhost:3000/",
    env: {
      apiBaseUrl: "http://localhost:8000/v1",
    },
  },
});
