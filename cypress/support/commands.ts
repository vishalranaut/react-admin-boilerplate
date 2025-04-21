// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/login');
  cy.get('input[placeholder="Enter username"]').type(username);
  cy.get('input[placeholder="Enter password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Declare global Cypress namespace to add custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login with username and password
       * @example cy.login('admin', 'admin123')
       */
      login(username: string, password: string): Chainable<void>;
    }
  }
}

export {};