import LaunchPage from '@launch-page/launch-page';
import UpcomingPage from '@launch-page/upcoming-page';
import HistoryPage from '@launch-page/history-page';
const launchPage = new LaunchPage();
const upcomingPage = new UpcomingPage();
const historyPage = new HistoryPage();

describe('Navigation', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('User can navigate from "Launch" page to "Upcoming" page', () => {
        launchPage.actions.headerNavigation.clickOnUpcomingLink();
        cy.url().should('include', '/upcoming');
    });

    it('User can navigate from "Launch" page to "History" page', () => {
        launchPage.actions.headerNavigation.clickOnHistoryLink();
        cy.url().should('include', '/history');
    });

    it('User can navigate from "Upcoming" page to "Launch" page', () => {
        cy.visit('/upcoming');
        launchPage.actions.headerNavigation.clickOnLaunchLink();
        cy.url().should('include', '/launch');
    });

    it('User can navigate from "Upcoming" page to "History" page', () => {
        cy.visit('/upcoming');
        launchPage.actions.headerNavigation.clickOnHistoryLink();
        cy.url().should('include', '/history');
    });

    it('User can navigate from "History" page to "Launch" page', () => {
        cy.visit('/history');
        launchPage.actions.headerNavigation.clickOnLaunchLink();
        cy.url().should('include', '/launch');
    });

    it('User can navigate from "History" page to "Upcoming" page', () => {
        cy.visit('/history');
        launchPage.actions.headerNavigation.clickOnUpcomingLink();
        cy.url().should('include', '/upcoming');
    });
});
