/// <reference types="cypress" />

import { SELECTORS } from './test-utils';

Cypress.Commands.add('assertIdleState', (label: string) => {
	cy.get(SELECTORS.button).should('be.visible').and('contain.text', label).and('not.be.disabled');
});

Cypress.Commands.add('assertLoadingState', (message = 'Loading, please wait') => {
	cy.get(SELECTORS.loadingIcon).should('exist');
	cy.get(SELECTORS.button).should('contain.text', message).and('be.visible').and('be.disabled');
});

Cypress.Commands.add('assertProgressState', (expected: number) => {
	cy.get(SELECTORS.button).should('be.disabled');
	cy.get(SELECTORS.progressBar).should('exist');
	cy.get(SELECTORS.progressText).should('have.text', `${expected}%`);
});

Cypress.Commands.add('assertSuccessState', (message = 'Completed successfully') => {
	cy.get(SELECTORS.successIcon).should('exist');
	cy.get(SELECTORS.button).should('contain.text', message).and('be.visible').and('be.disabled');
});

Cypress.Commands.add('assertErrorState', (message = 'An error occurred') => {
	cy.get(SELECTORS.errorIcon).should('exist');
	cy.get(SELECTORS.button).should('contain.text', message).and('be.visible').and('be.disabled');
});

Cypress.Commands.add('assertNoProgress', () => {
	cy.get(SELECTORS.progressBar).should('not.exist');
	cy.get(SELECTORS.progressText).should('not.exist');
});
