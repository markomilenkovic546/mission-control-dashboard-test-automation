const tv4 = require('tv4');
import * as planets from '../../../../db/seed-data/planets-seed-data.json';
import * as planetsSchema from '../../../fixtures/json-schemas/getPlanets-response-schema.json';

beforeEach(() => {
    cy.task('resetDbState');
});

describe('Tests which cover "GET", /v1/planets" request ', () => {
    it('Response status is equal 200', () => {
        cy.api({
            method: 'GET',
            url: `${Cypress.env('apiBaseUrl')}/planets`
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Response body contains expected properties', () => {
        cy.api({
            method: 'GET',
            url: `${Cypress.env('apiBaseUrl')}/planets`
        }).then((response) => {
            expect(response.body).to.deep.eq(planets);
        });
    });

    it('Response body matches the expected schema', () => {
        cy.api({
            method: 'GET',
            url: `${Cypress.env('apiBaseUrl')}/planets`
        }).then((response) => {
            const isValid = tv4.validate(response.body, planetsSchema);
            expect(isValid).to.be.true;
        });
    });
});
