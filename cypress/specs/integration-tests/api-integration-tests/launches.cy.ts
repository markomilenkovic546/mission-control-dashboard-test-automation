const tv4 = require('tv4');
import * as launches from '../../../../db/seed-data/launches-seed-data.json';
import * as launchesSchema from '../../../fixtures/json-schemas/getMissions-response-schema.json';

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
