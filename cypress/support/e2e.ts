/// <reference types="cypress" />

// Extend Cypress namespace
declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to log in a user
     * @example cy.login('user@example.com', 'password123')
     */
    login(email: string, password: string): Chainable<void>;
    /**
     * Custom command to log out the current user
     * @example cy.logout()
     */
    logout(): Chainable<void>;
  }
}

// Custom commands
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="user-menu"]').click();
  cy.contains('Logout').click();
  cy.url().should('include', '/login');
});

// Global test configuration
Cypress.config('defaultCommandTimeout', 10000);

// Preserve auth state
Cypress.Cookies.defaults({
  preserve: ['session', 'csrf-token'],
});

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err) => {
  // Log error but don't fail the test
  console.error('Uncaught exception:', err);
  return false;
});

// Log API calls in development
if (Cypress.env('NODE_ENV') === 'development') {
  Cypress.on('command:start', (command) => {
    if (command.name === 'request' || command.name === 'wait') {
      console.log(`${command.name.toUpperCase()}: ${JSON.stringify(command.args)}`);
    }
  });
} 