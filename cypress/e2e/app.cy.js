describe('Core Movie Search', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display MovieSearchForm with input field', () => {
    cy.get('.search-input').should('exist');
  });

  it('should display movie details after entering search input and pressing "Enter"', () => {
    const searchQuery = 'Avatar'; // Example search

    cy.get('.search-input').type(searchQuery).type('{enter}');

    // Wait for movie details container to load
    cy.get('.movie-details-container').should('exist');
  });

  it('should display loading indicator while fetching data', () => {
    const searchQuery = 'Avatar'; // Example search

    cy.get('.search-input').type(searchQuery).type('{enter}');

    // Loading indicator should be displayed
    cy.get('.loading-overlay').should('exist');

    // Loading indicator should go away after data is fetched
    cy.get('.loading-overlay').should('not.exist');
  });

  it('should handle "No movie found" condition', () => {
    // Failed request by messing up the fetch call
    cy.intercept('GET', 'https://api.themoviedb.org/3/**', {
      statusCode: 200, // Assume successful response
      body: { results: [] }, // Simulate empty results
    }).as('fetchFailed');
  
    const searchQuery = 'InvalidMovie'; // Non existent movie
  
    cy.get('.search-input').type(searchQuery).type('{enter}');
  
    // Wait for 'No Movie Found' message to be displayed
    cy.contains('No movie found', { timeout: 50000 }).should('exist');
  });
  

  it('should reset search input after displaying "No movie found" message', () => {
    // Mocking a failed request by stubbing the fetch call
    cy.intercept('GET', 'https://api.themoviedb.org/3/**', {
      statusCode: 200, // Assume successful response
      body: { results: [] }, // Simulate empty results
    }).as('fetchFailed');
  
    const searchQuery = 'InvalidMovie'; // Invalid search query
  
    cy.get('.search-input').type(searchQuery).type('{enter}');
  
    // Wait for "No movie found" message to be displayed
    cy.contains('No movie found', { timeout: 10000 }).should('exist');
  
    // Ensure search input is reset after displaying "No movie found" message
    cy.get('.search-input').should('have.value', '');
  });
});

describe('MovieDetails', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.search-input').type('Edge of Tomorrow').type('{enter}');
    cy.wait(5000); // Adjust wait time as needed for data loading
  });

  it('should display cast list and actor books when clicking on cast members', () => {
    // Check if cast list exists
    cy.get('.cast-listt').should('exist');

    // Check if cast members are present
    cy.get('.cast-member').should('have.length.above', 0);

    // Click on each cast member
    cy.get('.cast-member').each((castMember) => {
      cy.wrap(castMember).click();

      // Check if actor books container exists
      cy.get('.actor-books-container').should('exist');

      // Check if actor name is displayed
      cy.get('.actor-books-heading').should('exist');

      // Wait for actor books to load
      cy.wait(10000); // Adjust wait time as needed for data loading

      // Check if actor books are present
      cy.get('.actor-book-title').should('exist');

      // Close the actor books container
      cy.get('.cast-list-container').click(); // Click outside the container to close it
    });
  });
});

