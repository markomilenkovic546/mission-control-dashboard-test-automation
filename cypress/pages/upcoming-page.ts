export default class UpcomingPage {
  elements: {
    headerNavigation: {
      launchLink: () => Cypress.Chainable<JQuery<HTMLElement>>;
      upcomingLink: () => Cypress.Chainable<JQuery<HTMLElement>>;
      historyLink: () => Cypress.Chainable<JQuery<HTMLElement>>;
    };

    upcomingMissionsTable: {
      missionRows: () => Cypress.Chainable<JQuery<HTMLElement>>;
      missionRow: (rowIndex: number) => Cypress.Chainable<JQuery<HTMLElement>>;
      abortMissionButton: (rowIndex: number) => Cypress.Chainable<JQuery<HTMLElement>>;
      missionNumber: (rowIndex: number) => Cypress.Chainable<JQuery<HTMLElement>>;
      missionDate: (rowIndex: number) => Cypress.Chainable<JQuery<HTMLElement>>;
      missionRocket: (rowIndex: number) => Cypress.Chainable<JQuery<HTMLElement>>;
      missionDestination: (rowIndex: number) => Cypress.Chainable<JQuery<HTMLElement>>;
    };
  };

  actions: {
    clickOnAbortMissionButton: (rowIndex: number) => void;
  };

  constructor() {
    this.elements = {
      headerNavigation: {
        launchLink: () => cy.get('.Header-link-0-1-22[href="/launch"]'),
        upcomingLink: () => cy.get('.Header-link-0-1-22[href="/upcoming"]'),
        historyLink: () => cy.get('.Header-link-0-1-22[href="/history"]'),
      },

      upcomingMissionsTable: {
        missionRows: () => cy.get("tbody tr"),
        missionRow: (index) => cy.get("tbody tr").eq(index),
        abortMissionButton: (rowIndex) => {
          return this.elements.upcomingMissionsTable.missionRow(rowIndex).find("td").eq(0).find("a");
        },
        missionNumber: (rowIndex) => {
          return this.elements.upcomingMissionsTable.missionRow(rowIndex).find("td").eq(1);
        },
        missionDate: (rowIndex) => {
          return this.elements.upcomingMissionsTable.missionRow(rowIndex).find("td").eq(2);
        },
        missionRocket: (rowIndex) => {
          return this.elements.upcomingMissionsTable.missionRow(rowIndex).find("td").eq(3);
        },
        missionDestination: (rowIndex) => {
          return this.elements.upcomingMissionsTable.missionRow(rowIndex).find("td").eq(4);
        },
      },
    };

    this.actions = {
      clickOnAbortMissionButton: (rowIndex) => this.elements.upcomingMissionsTable.abortMissionButton(rowIndex).click(),
    };
  }
}
