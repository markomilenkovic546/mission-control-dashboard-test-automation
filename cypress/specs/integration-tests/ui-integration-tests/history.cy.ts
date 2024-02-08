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
        cy.intercept('GET', `${Cypress.env('apiBaseUrl')}/launches`, {
            statusCode: 200,
            body: launches
        }).as('launches');
        cy.visit('/');
        launchPage.actions.headerNavigation.clickOnHistoryLink();
        cy.wait('@launches').then(() => {
            const expectedLaunches = launches.filter(
                (launch) => launch.upcoming === false
            );
            const expectedLaunchesLength = expectedLaunches.length;
            historyPage.elements.missionHistoryTable
                .missionRows()
                .should('have.length', expectedLaunchesLength);
        });
    });

    it('Data from response body is correctly displayed in the history table', () => {
        cy.intercept('GET', `${Cypress.env('apiBaseUrl')}/launches`, {
            statusCode: 200,
            body: launches
        }).as('launches');
        cy.visit('/');
        launchPage.actions.headerNavigation.clickOnHistoryLink();
        cy.wait('@launches').then(() => {
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
