import React from 'react';
import CastList from './CastList'; // Import the CastList component
import './MovieDetails.css'; // Import CSS for MovieDetails component

function MovieDetails({ movieData }) {
  if (!movieData) {
    return null; // Don't render if movieData is null
  }

  return (
    <div className="cast-listt">
      {movieData.cast && movieData.cast.length > 0 && (
          <div className="cast-list-container"> {/* Wrap the CastList with a container */}
            <div className="cast-list">
              <CastList cast={movieData.cast} /> {/* Pass cast data to the CastList component */}
            </div>
          </div>
        )}
    <div className="movie-details-container">
      <div className="poster-container">
        <div className="poster-background" />
        {movieData.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt={`Poster for ${movieData.title}`}
            className="poster-image"
          />
        )}
      </div>
      <div className="details">
        <h2 className="title">{movieData.title}</h2>
        <p><strong>Release Date:</strong> {movieData.release_date}</p>
        <p><strong>Overview:</strong> {movieData.overview}</p>
        <p><strong>Vote Average:</strong> {movieData.vote_average}</p>
      </div>
    </div>
    </div>
  );
}

export default MovieDetails;
