describe('Authentication', () => {
  it('should login successfully with correct credentials', () => {
    cy.visit('/login');
    cy.get('input[placeholder="Enter username"]').type('admin');
    cy.get('input[placeholder="Enter password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    
    // Should redirect to dashboard after login
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome');
  });
  
  it('should show error with incorrect credentials', () => {
    cy.visit('/login');
    cy.get('input[placeholder="Enter username"]').type('admin');
    cy.get('input[placeholder="Enter password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    
    // Should stay on login page and show error
    cy.url().should('include', '/login');
    cy.contains('Invalid credentials');
  });
  
  it('should redirect to login when accessing protected route as anonymous', () => {
    cy.visit('/dashboard');
    cy.url().should('include', '/login');
  });
  
  it('should logout successfully', () => {
    // Login first
    cy.visit('/login');
    cy.get('input[placeholder="Enter username"]').type('admin');
    cy.get('input[placeholder="Enter password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    
    // Click on dropdown and then logout
    cy.get('#user-dropdown').click();
    cy.contains('Logout').click();
    
    // Should redirect to login
    cy.url().should('include', '/login');
  });
});