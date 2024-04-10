## Credits
Akaal

## Credits
Akaal

# Movie Search App with Streaming Availability

This React app allows users to search for movies, view details about them, explore streaming platforms where the movies are available, and discover books related to the actors. The app features a user-friendly interface with search functionality, loading indicators, and integration with external APIs for fetching movie details, streaming availability, and book data.

## Features

- **Movie Search:** Users can input movie titles to search using a search bar.
- **Movie Details:** Displays detailed information about the selected movie, including title, release date, overview, poster, vote average, and cast members.
- **Streaming Availability:** Shows available streaming platforms for the selected movie, enabling users to find where they can watch the movie online.
- **Actor Book Search:** Provides the ability to explore books related to each actor in the movie's cast.
- **Loading Indicator:** Includes a visual indicator while fetching data from external APIs to enhance user experience.
- **External APIs:** Integrates with TMDB API for movie details, Streaming Availability API for streaming options, and Open Library API for book data related to actors.

## Libraries Used

- **React:** A JavaScript library for building user interfaces.
- **axios:** Utilized for making HTTP requests to external APIs.
- **react-router-dom:** Manages navigation and routing within the app.
- **vite:** Serves as a fast and efficient development server and build tool.
- **CSS Modules:** Ensures CSS styles are scoped locally to components.

## Installation

1. Clone the repository:


`git clone`
`cd movietube`

2. Install Dependencies
`npm install`

3. Start the development server:
`npm run dev`

## Usage

- Utilize the search bar to enter a movie title and press Enter to initiate a search.
- Click on a movie from the search results to view its detailed information.
- Within the movie details page, available streaming platforms are displayed. Click on any platform to be redirected to the movie's page on that platform.
- Explore books related to actors by clicking on their names or images in the movie details page.

## APIs Used

- **TMDB API:** Fetches movie details, including cast information.
- **Streaming Availability API:** Identifies available streaming platforms for movies.
- **Open Library API:** Retrieves book data associated with actors.
