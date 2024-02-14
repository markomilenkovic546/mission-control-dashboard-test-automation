import * as defaultLaunchesData from '../../../db/seed-data/launches-seed-data.json';
import * as planetsData from '../../../db/seed-data/planets-seed-data.json';
import LaunchPage from '@launch-page/launch-page';
import { createLaunchPayload } from 'cypress/utils';
import { getCurrentDateInYYYYMMDDFormat } from 'cypress/utils';
const launchPage = new LaunchPage();

describe('Launch creation form', () => {
    before(() => {
        cy.task('resetDbState');
    });
    beforeEach(() => {
        cy.visit('/');
    });

    it('The "Launch Date" input field has current date as a default value', () => {
        launchPage.elements.missionForm
            .launchDateInput()
            .should('have.attr', 'value', getCurrentDateInYYYYMMDDFormat());
    });

    it('The "Rocket Type" input field has correct default value', () => {
        launchPage.elements.missionForm
            .rocketTypeInput()
            .should('have.attr', 'value', 'Explorer IS1');
    });

    it('The correct "Destinantion Exoplanet" option is selected by default', () => {
        launchPage.elements.missionForm
            .destinationExpoplanetDropdownOption(0)
            .should('have.attr', 'value', planetsData[0].keplerName);
    });

    it('User can create a launch with valid input', () => {
        cy.intercept('POST', `${Cypress.env('apiBaseUrl')}/launches`).as('mission');
        //Create launch test data
        const launch = createLaunchPayload();
        //Fill the form
        launchPage.actions.missionForm.typeLaunchDateInput(
            getCurrentDateInYYYYMMDDFormat()
        );
        launchPage.actions.missionForm.typeMissionNameInput(launch.mission);
        launchPage.actions.missionForm.clearRocketTypeInput();
        launchPage.actions.missionForm.typeRocketTypeInput(launch.rocket);
        launchPage.actions.missionForm.selectDestinationExpoplanet(launch.target);
        //Submit the form
        launchPage.actions.missionForm.clickOnLaunchMissionButton();
        // Verify that form is submitted successfully
        cy.wait('@mission').then((interception) => {
            expect(interception.response.statusCode).to.be.eql(201);
            expect(interception.response.body).to.deep.eq({
                launchDate: launch.launchDate,
                mission: launch.mission,
                rocket: launch.rocket,
                target: launch.target,
                success: true,
                upcoming: true,
                customers: ['NASA'],
                flightNumber: defaultLaunchesData.length + 1
            });
        });
    });

    it('User cannot create a launch with empty "Mission Name" filed', () => {
        cy.intercept('POST', `${Cypress.env('apiBaseUrl')}/launches`).as('mission');
        //Create launch test data
        const launch = createLaunchPayload();
        //Fill the form
        launchPage.actions.missionForm.typeLaunchDateInput(
            getCurrentDateInYYYYMMDDFormat()
        );
        launchPage.actions.missionForm.clearRocketTypeInput();
        launchPage.actions.missionForm.typeRocketTypeInput(launch.rocket);
        launchPage.actions.missionForm.selectDestinationExpoplanet(launch.target);
        //Submit the form
        launchPage.actions.missionForm.clickOnLaunchMissionButton();
        // Verify that form submission failed
        cy.wait('@mission').then((interception) => {
            expect(interception.response.statusCode).to.be.eql(400);
            expect(interception.response.body).to.deep.eq({
                error: 'Missing required launch property'
            });
        });
    });

    it('User cannot create a launch with empty "Rocket Type" filed', () => {
        cy.intercept('POST', `${Cypress.env('apiBaseUrl')}/launches`).as('mission');
        //Create launch test data
        const launch = createLaunchPayload();
        //Fill the form
        launchPage.actions.missionForm.typeLaunchDateInput(
            getCurrentDateInYYYYMMDDFormat()
        );
        launchPage.actions.missionForm.typeMissionNameInput(launch.mission);
        launchPage.actions.missionForm.clearRocketTypeInput();
        launchPage.actions.missionForm.selectDestinationExpoplanet(launch.target);
        //Submit the form
        launchPage.actions.missionForm.clickOnLaunchMissionButton();
        // Verify that form submission failed
        cy.wait('@mission').then((interception) => {
            expect(interception.response.statusCode).to.be.eql(400);
            expect(interception.response.body).to.deep.eq({
                error: 'Missing required launch property'
            });
        });
    });
});
