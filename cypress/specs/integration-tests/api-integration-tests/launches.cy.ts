const tv4 = require('tv4');
import * as launches from '../../../../db/seed-data/launches-seed-data.json';
import * as launchesSchema from '../../../fixtures/json-schemas/getMissions-response-schema.json';
import * as postLaunchSchema from '../../../fixtures/json-schemas/postMission-response-schema.json';
import * as launchesData from '../../../../db/seed-data/launches-seed-data.json';
import { createLaunchPayload } from 'cypress/utils';
import { faker } from '@faker-js/faker';
import { getCurrentDate } from 'cypress/utils';

describe('Tests which cover launches retrieving', () => {
    before(() => {
        cy.task('resetDbState');
    });

    it('Response status is 200 when retrieving launches', () => {
        cy.api({
            method: 'GET',
            url: `${Cypress.env('apiBaseUrl')}/launches`
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Response body contains expected properties when retrieving launches', () => {
        cy.api({
            method: 'GET',
            url: `${Cypress.env('apiBaseUrl')}/launches`
        }).then((response) => {
            expect(response.body).to.deep.eq(launches);
        });
    });

    it('Response body matches the expected schema when retrieving launches', () => {
        cy.api({
            method: 'GET',
            url: `${Cypress.env('apiBaseUrl')}/launches`
        }).then((response) => {
            const isValid = tv4.validate(response.body, launchesSchema);
            expect(isValid).to.be.true;
        });
    });
});

describe('Tests which cover launch posting', () => {
    before(() => {
        cy.task('resetDbState');
    });

    it('Response status is 201 when posting launch', () => {
        cy.api({
            method: 'POST',
            url: `${Cypress.env('apiBaseUrl')}/launches`,
            body: createLaunchPayload()
        }).then((response) => {
            expect(response.status).to.eq(201);
        });
    });

    it('Create launch', () => {
        cy.task('resetDbState');
        const payload = createLaunchPayload();
        cy.api({
            method: 'POST',
            url: `${Cypress.env('apiBaseUrl')}/launches`,
            body: payload
        }).then((response) => {
            expect(response.status).to.eq(201);
            // Get all posts and filter posted one
            cy.api({
                method: 'GET',
                url: `${Cypress.env('apiBaseUrl')}/launches`
            }).then((getLaunchesResponse) => {
                const postedLaunch = getLaunchesResponse.body.filter(
                    (launch) => launch.mission === payload.mission
                );
                // Verify that single launch instance is created
                expect(postedLaunch.length).to.be.within(1, 1);
            });
        });
    });

    it('Response body contains expected properties when posting launch', () => {
        cy.task('resetDbState');
        const payload = createLaunchPayload();
        cy.api({
            method: 'POST',
            url: `${Cypress.env('apiBaseUrl')}/launches`,
            body: payload
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.deep.eq({
                launchDate: payload.launchDate,
                mission: payload.mission,
                rocket: payload.rocket,
                target: payload.target,
                success: true,
                upcoming: true,
                customers: ['NASA'],
                flightNumber: launchesData.length + 1
            });
        });
    });

    it('Response body matches the expected schema when posting launches', () => {
        const payload = createLaunchPayload();
        cy.api({
            method: 'POST',
            url: `${Cypress.env('apiBaseUrl')}/launches`,
            body: payload
        }).then((response) => {
            const isValid = tv4.validate(response.body, postLaunchSchema);
            expect(isValid).to.be.true;
        });
    });

    it('It is not possible to create a launch by posting a payload missing the "launchDate" property', () => {
        cy.api({
            method: 'POST',
            url: `${Cypress.env('apiBaseUrl')}/launches`,
            body: {
                mission: faker.lorem.word(),
                rocket: faker.lorem.word(),
                target: 'Kepler-1410 b'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.deep.eq({
                error: 'Missing required launch property'
            });
        });
    });

    it('It is not possible to create a launch by posting a payload missing the "mission" property', () => {
        cy.api({
            method: 'POST',
            url: `${Cypress.env('apiBaseUrl')}/launches`,
            body: {
                launchDate: getCurrentDate(),
                rocket: faker.lorem.word(),
                target: 'Kepler-442 b'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.deep.eq({
                error: 'Missing required launch property'
            });
        });
    });

    it('It is not possible to create a launch by posting a payload missing the "rocket" property', () => {
        cy.api({
            method: 'POST',
            url: `${Cypress.env('apiBaseUrl')}/launches`,
            body: {
                launchDate: getCurrentDate(),
                mission: faker.lorem.word(),
                target: 'Kepler-442 b'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.deep.eq({
                error: 'Missing required launch property'
            });
        });
    });

    it('It is not possible to create a launch by posting a payload missing the "target" property', () => {
        cy.api({
            method: 'POST',
            url: `${Cypress.env('apiBaseUrl')}/launches`,
            body: {
                launchDate: getCurrentDate(),
                mission: faker.lorem.word(),
                rocket: faker.lorem.word()
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.deep.eq({
                error: 'Missing required launch property'
            });
        });
    });

    it('It is not possible to create a launch by posting a empty object as a payload', () => {
        cy.api({
            method: 'POST',
            url: `${Cypress.env('apiBaseUrl')}/launches`,
            body: {},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.deep.eq({
                error: 'Missing required launch property'
            });
        });
    });

    it('It is not possible to create a launch by posting a incorrect payload data struture', () => {
        cy.api({
            method: 'POST',
            url: `${Cypress.env('apiBaseUrl')}/launches`,
            body: [
                {
                    launchDate: getCurrentDate(),
                    mission: faker.lorem.word(),
                    rocket: faker.lorem.word(),
                    target: 'Kepler-442 b'
                }
            ],
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.deep.eq({
                error: 'Missing required launch property'
            });
        });
    });
});
