export default class HistoryPage {
    elements: {
        headerNavigation: {
            launchLink: () => Cypress.Chainable<JQuery<HTMLElement>>;
            upcomingLink: () => Cypress.Chainable<JQuery<HTMLElement>>;
            historyLink: () => Cypress.Chainable<JQuery<HTMLElement>>;
        };

        missionHistoryTable: {
            missionRows: () => Cypress.Chainable<JQuery<HTMLElement>>;
            missionRow: (rowIndex: number) => Cypress.Chainable<JQuery<HTMLElement>>;
            missionStatus: (rowIndex: number) => Cypress.Chainable<JQuery<HTMLElement>>;
            missionName: (rowIndex: number) => Cypress.Chainable<JQuery<HTMLElement>>;
            missionNumber: (rowIndex: number) => Cypress.Chainable<JQuery<HTMLElement>>;
            missionDate: (rowIndex: number) => Cypress.Chainable<JQuery<HTMLElement>>;
            missionRocket: (rowIndex: number) => Cypress.Chainable<JQuery<HTMLElement>>;
            missionCustomers: (
                rowIndex: number
            ) => Cypress.Chainable<JQuery<HTMLElement>>;
        };
    };

    actions: {
        headerNavigation: {
            clickOnLaunchLink: () => void;
            clickOnUpcomingLink: () => void;
            clickOnHistoryLink: () => void;
        };
    };

    constructor() {
        this.elements = {
            headerNavigation: {
                launchLink: () => cy.get('.Header-link-0-1-22[href="/launch"]'),
                upcomingLink: () => cy.get('.Header-link-0-1-22[href="/upcoming"]'),
                historyLink: () => cy.get('.Header-link-0-1-22[href="/history"]')
            },

            missionHistoryTable: {
                missionRows: () => cy.get('tbody tr'),
                missionRow: (index) => cy.get('tbody tr').eq(index),
                missionStatus: (rowIndex) => {
                    return this.elements.missionHistoryTable
                        .missionRow(rowIndex)
                        .find('td')
                        .eq(0)
                        .find('span');
                },
                missionNumber: (rowIndex) => {
                    return this.elements.missionHistoryTable
                        .missionRow(rowIndex)
                        .find('td')
                        .eq(1);
                },

                missionDate: (rowIndex) => {
                    return this.elements.missionHistoryTable
                        .missionRow(rowIndex)
                        .find('td')
                        .eq(2);
                },
                missionName: (rowIndex) => {
                    return this.elements.missionHistoryTable
                        .missionRow(rowIndex)
                        .find('td')
                        .eq(3);
                },

                missionRocket: (rowIndex) => {
                    return this.elements.missionHistoryTable
                        .missionRow(rowIndex)
                        .find('td')
                        .eq(4);
                },
                missionCustomers: (rowIndex) => {
                    return this.elements.missionHistoryTable
                        .missionRow(rowIndex)
                        .find('td')
                        .eq(5);
                }
            }
        };

        this.actions = {
            headerNavigation: {
                clickOnLaunchLink: () =>
                    this.elements.headerNavigation.launchLink().click(),
                clickOnUpcomingLink: () =>
                    this.elements.headerNavigation.upcomingLink().click(),
                clickOnHistoryLink: () =>
                    this.elements.headerNavigation.historyLink().click()
            }
        };
    }
}
