const tv4 = require('tv4');
import * as planets from '../../../../db/seed-data/planets-seed-data.json';
import * as planetsSchema from '../../../fixtures/json-schemas/getPlanets-response-schema.json';

describe('Tests which cover planets retrieving ', () => {
    before(() => {
        cy.task('resetDbState');
    });
    
    it('Response status is 200 when retrieving planets', () => {
        cy.api({
            method: 'GET',
            url: `${Cypress.env('apiBaseUrl')}/planets`
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Response body contains expected properties when retrieving planets', () => {
        cy.api({
            method: 'GET',
            url: `${Cypress.env('apiBaseUrl')}/planets`
        }).then((response) => {
            expect(response.body).to.deep.eq(planets);
        });
    });

    it('Response body matches the expected schema when retrieving planets', () => {
        cy.api({
            method: 'GET',
            url: `${Cypress.env('apiBaseUrl')}/planets`
        }).then((response) => {
            const isValid = tv4.validate(response.body, planetsSchema);
            expect(isValid).to.be.true;
        });
    });
});
