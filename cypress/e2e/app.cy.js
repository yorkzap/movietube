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
    cy.get('.movie-details-container').should('exist'); // Ensure movie details container is present
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
    cy.get('.loading-overlay', { timeout: 10000 }).should('not.exist'); // Wait for loading indicator to disappear
  });

  it('should display cast list and actor books when clicking on cast members', () => {
    // Check if cast list exists
    cy.get('.cast-list').should('exist');

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
      cy.get('.actor-book-title', { timeout: 10000 }).should('exist'); // Adjust wait time as needed for data loading
    });
  });

  it('should display streaming options for the selected movie', () => {
    // Check if streaming links exist
    cy.get('.streaming-links').should('exist');

    // Check if at least one streaming button or link is there
    cy.get('.streaming-button').should('have.length.above', 0);
  });

  it('should navigate to streaming service on clicking streaming link', () => {
    // Get the href attribute of the first streaming button
    cy.get('.streaming-button').first().should('have.attr', 'href').then((href) => {
      // Assert that the href attribute contains 'http' to ensure it's a valid URL
      expect(href).to.include('http');
    });
  });
});
