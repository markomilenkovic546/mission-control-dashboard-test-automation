import LaunchPage from '@launch-page/launch-page';
import UpcomingPage from '@upcoming-page/upcoming-page';
import HistoryPage from '@history-page/history-page';
import * as launches from '../../../fixtures/launches.json';
import { formatDate } from 'cypress/utils';
const launchPage = new LaunchPage();
const upcomingPage = new UpcomingPage();
const historyPage = new HistoryPage();

describe('History table - Expected valid response handling', () => {
    it('Expected number of rows is displayed in the history table', () => {
        //Listen for network requests and intercept particular GET request
        cy.intercept('GET', `${Cypress.env('apiBaseUrl')}/launches`, {
            statusCode: 200,
            body: launches
        }).as('launches');
        cy.visit('/');
        //Navigate to history page
        launchPage.actions.headerNavigation.clickOnHistoryLink();
        cy.wait('@launches').then(() => {
            // Filter missions that don't have an upcoming status
            const expectedLaunches = launches.filter(
                (launch) => launch.upcoming === false
            );
            const expectedLaunchesLength = expectedLaunches.length;
            //Verify that expected number of missions is displayed on the UI
            historyPage.elements.missionHistoryTable
                .missionRows()
                .should('have.length', expectedLaunchesLength);
        });
    });

    it('Data from response body is correctly displayed in the history table', () => {
        //Listen for network requests and intercept particular GET request
        cy.intercept('GET', `${Cypress.env('apiBaseUrl')}/launches`, {
            statusCode: 200,
            body: launches
        }).as('launches');
        cy.visit('/');
        //Navigate to history page
        launchPage.actions.headerNavigation.clickOnHistoryLink();
        //Once the request is intercepted verify that mock data is displayed correctly on the UI
        cy.wait('@launches').then(() => {
            // Filter missions that don't have an upcoming status
            const expectedLaunches = launches.filter(
                (launch) => launch.upcoming === false
            );
            expectedLaunches.forEach((mission, index) => {
                historyPage.elements.missionHistoryTable
                    .missionStatus(index)
                    .should(
                        'have.attr',
                        'style',
                        mission.success === false
                            ? 'color: red;'
                            : 'color: greenyellow;'
                    );
                historyPage.elements.missionHistoryTable
                    .missionNumber(index)
                    .should('have.text', mission.flightNumber);
                historyPage.elements.missionHistoryTable
                    .missionDate(index)
                    .should('contain.text', formatDate(mission.launchDate));
                historyPage.elements.missionHistoryTable
                    .missionName(index)
                    .should('have.text', mission.mission);
                historyPage.elements.missionHistoryTable
                    .missionRocket(index)
                    .should('have.text', mission.rocket);
                historyPage.elements.missionHistoryTable
                    .missionCustomers(index)
                    .should('have.text', mission.customers.join(', '));
            });
        });
    });
});

describe('History table - Invalid response handling', () => {
    it('Client appropriately handles error 404 response from server during mission retrieval', () => {
        //Listen for network requests and intercept particular GET request
        cy.intercept('GET', `${Cypress.env('apiBaseUrl')}/launches`, {
            statusCode: 404,
            body: '<html><body><h1>Not Found</h1></body></html>'
        }).as('launches');
        cy.visit('/');
        //Navigate to history page
        launchPage.actions.headerNavigation.clickOnHistoryLink();
        cy.wait('@launches').then(() => {
            //Verify that the client correctly handles a response with status 404
            historyPage.elements.missionHistoryTable
                .missionRow(0)
                .should(
                    'have.text',
                    'Oops! We encountered a problem while fetching data. Please try again later.'
                );
            historyPage.elements.missionHistoryTable
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
        //Navigate to history page
        launchPage.actions.headerNavigation.clickOnHistoryLink();
        cy.wait('@launches').then(() => {
            //Verify that the client correctly handles a response with status 400
            historyPage.elements.missionHistoryTable
                .missionRow(0)
                .should(
                    'have.text',
                    'Oops! We encountered a problem while fetching data. Please try again later.'
                );
            historyPage.elements.missionHistoryTable
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
        //Navigate to history page
        launchPage.actions.headerNavigation.clickOnHistoryLink();
        cy.wait('@launches').then(() => {
            //Verify that the client correctly handles a response with status 500
            historyPage.elements.missionHistoryTable
                .missionRow(0)
                .should(
                    'have.text',
                    'Oops! We encountered a problem while fetching data. Please try again later.'
                );
            historyPage.elements.missionHistoryTable
                .missionRows()
                .should('have.length', '1');
        });
    });
});
