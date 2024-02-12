import LaunchPage from '@launch-page/launch-page';
import UpcomingPage from '@upcoming-page/upcoming-page';
import * as launches from '../../../fixtures/launches.json';
import { formatDate } from 'cypress/utils';
const launchPage = new LaunchPage();
const upcomingPage = new UpcomingPage();

describe('Upcoming table - Expected valid response handling', () => {
    it('Expected number of rows is displayed in the "Upcoming" table', () => {
        //Listen for network requests and intercept particular GET request
        cy.intercept('GET', `${Cypress.env('apiBaseUrl')}/launches`, {
            statusCode: 200,
            body: launches
        }).as('launches');
        cy.visit('/');
        //Navigate to upcoming page
        launchPage.actions.headerNavigation.clickOnUpcomingLink();
        cy.wait('@launches').then(() => {
            // Filter missions that have an upcoming status
            const expectedLaunches = launches.filter(
                (launch) => launch.upcoming === true
            );
            const expectedLaunchesLength = expectedLaunches.length;
            //Verify that expected number of missions is displayed on the UI
            upcomingPage.elements.upcomingMissionsTable
                .missionRows()
                .should('have.length', expectedLaunchesLength);
        });
    });

    it('Data from response body is correctly displayed in the "Upcoming" table', () => {
        //Listen for network requests and intercept particular GET request
        cy.intercept('GET', `${Cypress.env('apiBaseUrl')}/launches`, {
            statusCode: 200,
            body: launches
        }).as('launches');
        cy.visit('/');
        //Navigate to upcoming page
        launchPage.actions.headerNavigation.clickOnUpcomingLink();
        //Once the request is intercepted verify that mock data is displayed correctly on the UI
        cy.wait('@launches').then(() => {
            // Filter missions that have an upcoming status
            const expectedLaunches = launches.filter(
                (launch) => launch.upcoming === true
            );
            expectedLaunches.forEach((mission, index) => {
                upcomingPage.elements.upcomingMissionsTable
                    .abortMissionButton(index)
                    .should('be.visible');
                upcomingPage.elements.upcomingMissionsTable
                    .missionNumber(index)
                    .should('have.text', mission.flightNumber);
                upcomingPage.elements.upcomingMissionsTable
                    .missionDate(index)
                    .should('have.text', formatDate(mission.launchDate));
                upcomingPage.elements.upcomingMissionsTable
                    .missionName(index)
                    .should('have.text', mission.mission);
                upcomingPage.elements.upcomingMissionsTable
                    .missionRocket(index)
                    .should('have.text', mission.rocket);
                upcomingPage.elements.upcomingMissionsTable
                    .missionDestination(index)
                    .should('have.text', '');
            });
        });
    });
});

describe('Upcoming table - Invalid response handling', () => {
    it('Client appropriately handles error 404 response from server during mission retrieval', () => {
        //Listen for network requests and intercept particular GET request
        cy.intercept('GET', `${Cypress.env('apiBaseUrl')}/launches`, {
            statusCode: 404,
            body: '<html><body><h1>Not Found</h1></body></html>'
        }).as('launches');
        cy.visit('/');
        //Navigate to upcoming page
        upcomingPage.actions.headerNavigation.clickOnUpcomingLink();
        cy.wait('@launches').then(() => {
            //Verify that the client correctly handles a response with status 404
            upcomingPage.elements.upcomingMissionsTable
                .missionRow(0)
                .should(
                    'have.text',
                    'Oops! We encountered a problem while fetching data. Please try again later.'
                );
            upcomingPage.elements.upcomingMissionsTable
                .missionRows()
                .should('have.length', '1');
        });
    });

    it('Client appropriately handles error 400 response from server during mission retrieval', () => {
        //Listen for network requests and intercept particular GET request
        cy.intercept('GET', `${Cypress.env('apiBaseUrl')}/launches`, {
            statusCode: 400,
            body: '<html><body><h1>Bad Request</h1></body></html>'
        }).as('launches');
        cy.visit('/');
        //Navigate to upcoming page
        upcomingPage.actions.headerNavigation.clickOnUpcomingLink();
        cy.wait('@launches').then(() => {
            //Verify that the client correctly handles a response with status 400
            upcomingPage.elements.upcomingMissionsTable
                .missionRow(0)
                .should(
                    'have.text',
                    'Oops! We encountered a problem while fetching data. Please try again later.'
                );
            upcomingPage.elements.upcomingMissionsTable
                .missionRows()
                .should('have.length', '1');
        });
    });

    it('Client appropriately mandles error 500 response from server during mission retrieval', () => {
        //Listen for network requests and intercept particular GET request
        cy.intercept('GET', `${Cypress.env('apiBaseUrl')}/launches`, {
            statusCode: 500,
            body: '<html><body><h1>500 Internal Server Error</h1></body></html>'
        }).as('launches');
        cy.visit('/');
        //Navigate to upcoming page
        upcomingPage.actions.headerNavigation.clickOnUpcomingLink();
        cy.wait('@launches').then(() => {
            //Verify that the client correctly handles a response with status 500
            upcomingPage.elements.upcomingMissionsTable
                .missionRow(0)
                .should(
                    'have.text',
                    'Oops! We encountered a problem while fetching data. Please try again later.'
                );
            upcomingPage.elements.upcomingMissionsTable
                .missionRows()
                .should('have.length', '1');
        });
    });
});
