import React, { useState } from 'react';
import './App.css';
import MovieSearchForm from './components/MovieSearchForm';
import MovieDetails from './components/MovieDetails';
import LoadingIndicator from './components/LoadingIndicator';

function App() {
  const [query, setQuery] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchMovieData = async () => {
    setIsLoading(true);
    try {
      // Simulate load time
      setTimeout(async () => {
        // Search for the movie
        const searchResponse = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=200944b2243451c557891abdc589c6af`);
        const searchData = await searchResponse.json();
        const movieId = searchData.results[0]?.id; // Get the ID of the first movie in the search results
  
        // Fetch details of the movie by its ID
        if (movieId) {
          const detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=200944b2243451c557891abdc589c6af`);
          const detailsData = await detailsResponse.json();
  
          // Fetch cast information
          const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=200944b2243451c557891abdc589c6af`);
          const creditsData = await creditsResponse.json();
          const cast = creditsData.cast.slice(0, 5); // Limit to first 5 cast members
  
          // Merge cast information with movie details
          const movieDetails = {
            ...detailsData,
            cast: cast,
          };
  
          setMovieData(movieDetails);
          setErrorMessage('');
        } else {
          // No movie found
          setMovieData(null);
          setErrorMessage('No movie found, please search for another movie.');
          setQuery(''); // Clear the input field
        }
        setIsLoading(false);
      }, 1000); // Simulated loading time of 1000ms
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Error fetching data. Please try again later.');
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMovieData();
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="home-link" onClick={() => window.location.reload()} style={{ cursor: 'pointer' }}>MovieTube</h1> {/* Added onClick to refresh page */}
      </div>
      <div className="content">
        <MovieSearchForm
          query={query}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <MovieDetails movieData={movieData} />
        )}
      </div>
    </div>
  );
}

export default App;
