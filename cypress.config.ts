import { defineConfig } from 'cypress';
import dropAllCollections from '@dropAllCollections/dropCollections';
import populateDB from '@dropAllCollections/populateData';

export default defineConfig({
    e2e: {
        chromeWebSecurity: false,
        specPattern: 'cypress/specs/**/*.cy.{js,jsx,ts,tsx}',
        reporter: 'cypress-mochawesome-reporter',
        testIsolation: true,
        setupNodeEvents(on, config) {
            // implement node event listeners here
            require('cypress-mochawesome-reporter/plugin')(on);
            on('task', {
                async resetDbState() {
                    await dropAllCollections();
                    await populateDB();
                    return null
                }
               
            });
        },
        baseUrl: 'http://localhost:3000/',
        env: {
            apiBaseUrl: 'http://localhost:8000/v1'
        }
    }
});
