export {};
declare global {
    namespace Cypress {
        interface Chainable {
            getAllLaunches(): Chainable<any>;
            getUpcomingLaunches(): Chainable<any>;
            getFinishedLaunches(): Chainable<any>;
        }
    }
}

Cypress.Commands.add('getAllLaunches', () => {
    cy.api({
        method: 'GET',
        url: `${Cypress.env('apiBaseUrl')}/launches`
    }).then((response) => {
        return response;
    });
});

Cypress.Commands.add('getUpcomingLaunches', () => {
    cy.api({
        method: 'GET',
        url: `${Cypress.env('apiBaseUrl')}/launches`
    }).then((response) => {
        const upcomingLaunches = response.body.filter(
            (launch) => launch.upcoming === true
        );
        return upcomingLaunches;
    });
});

Cypress.Commands.add('getFinishedLaunches', () => {
    cy.api({
        method: 'GET',
        url: `${Cypress.env('apiBaseUrl')}/launches`
    }).then((response) => {
        const finishedLaunches = response.body.filter(
            (launch) => launch.upcoming === false
        );
        return finishedLaunches;
    });
});
