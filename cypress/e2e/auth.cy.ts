describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should show error for invalid credentials', () => {
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.get('[role="alert"]').should('contain', 'Invalid credentials');
  });

  it('should navigate to signup page', () => {
    cy.contains('Create an account').click();
    cy.url().should('include', '/signup');
  });

  it('should successfully log in with valid credentials', () => {
    cy.get('input[name="email"]').type(Cypress.env('TEST_USER_EMAIL'));
    cy.get('input[name="password"]').type(Cypress.env('TEST_USER_PASSWORD'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
}); 