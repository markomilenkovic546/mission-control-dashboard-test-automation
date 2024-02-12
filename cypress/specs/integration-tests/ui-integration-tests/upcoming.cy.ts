import LaunchPage from '@launch-page/launch-page';
import UpcomingPage from '@upcoming-page/upcoming-page';
import HistoryPage from '@history-page/history-page';
import * as launches from '../../../fixtures/launches.json';
import { formatDate } from 'cypress/utils';
const launchPage = new LaunchPage();
const upcomingPage = new UpcomingPage();
const historyPage = new HistoryPage();

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
            historyPage.elements.missionHistoryTable
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
