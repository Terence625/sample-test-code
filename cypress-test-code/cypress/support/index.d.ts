/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to ... add your description here
     * @example cy.clickOnMyJourneyInCandidateCabinet()
     */
    selectSingleItem(elementSelector: string, value: string): Chainable<Subject>;
    input(elementSelector: string, value: string): Chainable<Subject>;
  }
}