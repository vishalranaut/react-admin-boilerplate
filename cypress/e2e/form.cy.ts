describe('Form Management', () => {
  beforeEach(() => {
    // Login before each test
    cy.visit('/login');
    cy.get('input[placeholder="Enter username"]').type('admin');
    cy.get('input[placeholder="Enter password"]').type('admin123');
    cy.get('button[type="submit"]').click();
  });
  
  it('should render user form correctly', () => {
    cy.visit('/users/add');
    cy.contains('Add New User');
    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('input[name="name"]').should('exist');
    cy.get('select[name="role"]').should('exist');
  });
  
  it('should validate form inputs', () => {
    cy.visit('/users/add');
    
    // Try to submit without filling required fields
    cy.get('button[type="submit"]').click();
    
    // Should show validation errors
    cy.contains('Username is required');
    cy.contains('Email is required');
    cy.contains('Password is required');
    cy.contains('Name is required');
  });
  
  it('should validate password matching', () => {
    cy.visit('/users/add');
    
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('differentpassword');
    cy.get('input[name="name"]').type('Test User');
    
    cy.get('button[type="submit"]').click();
    
    // Should show password matching error
    cy.contains('Passwords must match');
  });
  
  it('should validate email format', () => {
    cy.visit('/users/add');
    
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('button[type="submit"]').click();
    
    // Should show email format error
    cy.contains('Invalid email address');
  });
});