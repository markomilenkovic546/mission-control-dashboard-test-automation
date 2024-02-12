import LaunchPage from '@launch-page/launch-page';
const tv4 = require('tv4');
import * as planets from '../../../fixtures/planets.json';
import { missionPayload } from 'cypress/fixtures/mission-payload';
import * as payloadJsonSchema from '../../../fixtures/mission-payload-json-schema.json';
const launchPage = new LaunchPage();

describe('Planets - Expected valid response handling', () => {
    it('The Destination expoplanet drop-down contains all expected options', () => {
        //Listen for network requests and intercept particular GET request
        cy.intercept('GET', `${Cypress.env('apiBaseUrl')}/planets`, {
            statusCode: 200,
            body: planets
        }).as('planets');
        cy.visit('/');
        cy.wait('@planets').then(() => {
            //Verify that planets drop-down contains all expected options
            planets.forEach((planet, index) => {
                launchPage.elements.missionForm
                    .destinationExpoplanetDropdownOption(index)
                    .should('have.text', planet.keplerName);
            });
            launchPage.elements.missionForm
                .destinationExpoplanetDropdownOptions()
                .should('have.length', planets.length);
        });
    });
});

describe('Planets - Invalid response handling', () => {
    it('Client appropriately handles error 404 response from server during planets retrieval', () => {
        //Listen for network requests and intercept particular GET request
        cy.intercept('GET', `${Cypress.env('apiBaseUrl')}/planets`, {
            statusCode: 404,
            body: '<html><body><h1>Not Found</h1></body></html>'
        }).as('launches');
        cy.visit('/');
        cy.wait('@launches').then(() => {
            //Verify that the client correctly handles a response with status 404
            cy.get('body').contains(
                'Oops! We encountered a problem while fetching data. Please try again later.'
            );
        });
    });

    it('Client appropriately handles error 400 response from server during planets retrieval', () => {
        //Listen for network requests and intercept particular GET request
        cy.intercept('GET', `${Cypress.env('apiBaseUrl')}/planets`, {
            statusCode: 400,
            body: '<html><body><h1>Bad Request</h1></body></html>'
        }).as('launches');
        cy.visit('/');
        cy.wait('@launches').then(() => {
            //Verify that the client correctly handles a response with status 400
            cy.get('body').contains(
                'Oops! We encountered a problem while fetching data. Please try again later.'
            );
        });
    });

    it('Client appropriately handles error 500 response from server during planets retrieval', () => {
        //Listen for network requests and intercept particular GET request
        cy.intercept('GET', `${Cypress.env('apiBaseUrl')}/planets`, {
            statusCode: 500,
            body: '<html><body><h1>500 Internal Server Error</h1></body></html>'
        }).as('launches');
        cy.visit('/');
        cy.wait('@launches').then(() => {
            //Verify that the client correctly handles a response with status 500
            cy.get('body').contains(
                'Oops! We encountered a problem while fetching data. Please try again later.'
            );
        });
    });
});

describe('Launch - Posting mission', () => {
    it.only('Post mission', () => {
        cy.intercept('POST', `${Cypress.env('apiBaseUrl')}/launches`).as('mission');

        cy.visit('/');
        //Fill the mission form
        launchPage.actions.missionForm.typeMissionNameInput(missionPayload.mission);
        launchPage.actions.missionForm.selectDestinationExpoplanet(
            missionPayload.target
        );
        // Submit the mission form
        launchPage.actions.missionForm.clickOnLaunchMissionButton();
        cy.wait('@mission').then((interception) => {
            const requestBody = interception.request.body;
            //Verify request body properties
            expect(requestBody.launchDate).to.equal(missionPayload.launchDate);
            expect(requestBody.mission).to.equal(missionPayload.mission);
            expect(requestBody.rocket).to.equal(missionPayload.rocket);
            expect(requestBody.target).to.equal(missionPayload.target);
            // Validate json schema of the request body
            const isValid = tv4.validate(requestBody, payloadJsonSchema);
            expect(isValid).to.be.true;
        });
    });
});
