## Credits
Akaal

# Movie Search App with support for books related to cast

This React app allows users to search for movies and view details about them, as well as explore books related to actors. The app features a user-friendly interface with search functionality, loading indicators, and integration with external APIs for fetching movie and book data.

## Features

- **Movie Search:** Users can search for movies by title using the search bar.
- **Movie Details:** Detailed information about the selected movie is displayed, including title, release date, overview, and cast members.
- **Actor Book Search:** For each actor in the movie's cast, users can explore books related to them.
- **Loading Indicator:** A loading indicator is displayed while fetching movie and book data to provide feedback to the user.
- **External APIs:** The app integrates with external APIs to fetch movie data (TMDB API) and book data (Open Library API).

## Libraries Used

- **React:** A JavaScript library for building user interfaces.
- **axios:** A promise-based HTTP client for making HTTP requests to fetch data from external APIs.
- **react-router-dom:** A routing library for React to handle navigation and routing in the app.
- **vite:** A fast, lightweight development server and build tool for modern web development.
- **CSS Modules:** For local scoping of CSS styles in React components.

## Installation

1. Clone the repository:


`git clone`
`cd movietube`

2. Install Dependencies
`npm install`

3. Start the development server:
`npm run dev`

## Usage

- Enter a movie title in the search bar and press Enter to search for movies.
- Click on a movie to view its details.
- Explore books related to each actor by clicking on their name or image in the movie details page.

## APIs Used

- **TMDB API:** Used for fetching movie data such as movie details and cast information.
- **Open Library API:** Used for retrieving book data related to actors.
