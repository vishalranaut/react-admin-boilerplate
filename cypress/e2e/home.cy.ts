describe('Home Dashboard', () => {
  beforeEach(() => {
    // Login before each test
    cy.visit('/login');
    cy.get('input[placeholder="Enter username"]').type('admin');
    cy.get('input[placeholder="Enter password"]').type('admin123');
    cy.get('button[type="submit"]').click();
  });
  
  it('should display dashboard with stats cards', () => {
    cy.url().should('include', '/dashboard');
    cy.contains('Total Users');
    cy.contains('Templates');
    cy.contains('Menus');
    cy.contains('Forms');
  });
  
  it('should navigate to users page', () => {
    cy.contains('View Users').click();
    cy.url().should('include', '/users');
    cy.contains('User Management');
  });
  
  it('should navigate to templates page', () => {
    cy.contains('View Templates').click();
    cy.url().should('include', '/templates');
  });
  
  it('should navigate to profile page', () => {
    // Click on dropdown and then Profile
    cy.get('#user-dropdown').click();
    cy.contains('Profile').click();
    cy.url().should('include', '/profile');
    cy.contains('Profile Information');
  });
});