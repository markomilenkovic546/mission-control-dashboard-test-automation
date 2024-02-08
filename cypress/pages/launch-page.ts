export default class LaunchPage {
    elements: {
        headerNavigation: {
            launchLink: () => Cypress.Chainable<JQuery<HTMLElement>>;
            upcomingLink: () => Cypress.Chainable<JQuery<HTMLElement>>;
            historyLink: () => Cypress.Chainable<JQuery<HTMLElement>>;
        };

        missionForm: {
            launchDateInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
            missionNameInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
            rocketTypeInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
            destinationExpoplanetDropdown: () => Cypress.Chainable<
                JQuery<HTMLElement>
            >;
            launchMissionButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
        };
    };

    actions: {
        headerNavigation: {
            clickOnLaunchLink: () => void;
            clickOnUpcomingLink: () => void;
            clickOnHistoryLink: () => void;
        };

        missionForm: {
            typeLaunchDateInput: (date: string) => void;
            typeMissionNameInput: (missionName: string) => void;
            typeRocketTypeInput: (rocketType: string) => void;
            selectDestinationExpoplanetDropdown: (option: string) => void;
            clearMissionNameInput: () => void;
            clearRocketTypeInput: () => void;
            clickOnLaunchMissionButton: () => void;
        };
    };

    constructor() {
        this.elements = {
            headerNavigation: {
                launchLink: () => cy.get('.Header-link-0-1-22[href="/launch"]'),
                upcomingLink: () =>
                    cy.get('.Header-link-0-1-22[href="/upcoming"]'),
                historyLink: () =>
                    cy.get('.Header-link-0-1-22[href="/history"]')
            },

            missionForm: {
                launchDateInput: () => cy.get('#launch-day'),
                missionNameInput: () => cy.get('#mission-name'),
                rocketTypeInput: () => cy.get('#rocket-name'),
                destinationExpoplanetDropdown: () =>
                    cy.get('#planets-selector'),
                launchMissionButton: () =>
                    cy.get('button:contains("Launch Mission ✔")')
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
            },
            missionForm: {
                typeLaunchDateInput: (date) =>
                    this.elements.missionForm.launchDateInput().type(date),
                typeMissionNameInput: (missionName) =>
                    this.elements.missionForm
                        .missionNameInput()
                        .type(missionName),
                typeRocketTypeInput: (rocketType) =>
                    this.elements.missionForm
                        .rocketTypeInput()
                        .type(rocketType),
                selectDestinationExpoplanetDropdown: (option) =>
                    this.elements.missionForm
                        .destinationExpoplanetDropdown()
                        .select(option),
                clearMissionNameInput: () =>
                    this.elements.missionForm.missionNameInput().clear(),
                clearRocketTypeInput: () =>
                    this.elements.missionForm.rocketTypeInput().clear(),
                clickOnLaunchMissionButton: () =>
                    this.elements.missionForm.launchMissionButton().click()
            }
        };
    }
}
