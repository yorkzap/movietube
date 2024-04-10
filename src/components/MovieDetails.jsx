import React from 'react';
import CastList from './CastList';
import StreamingAvailability from './StreamingAvailability';
import './MovieDetails.css';

function MovieDetails({ movieData }) {
  if (!movieData) {
    return null; // Don't render if movieData is null
  }

  return (
    <div className="movie-details-wrapper">
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
      {/* Streaming Availability */}
      <StreamingAvailability movieId={movieData.id} />
      {/* Cast List */}
      {movieData.cast && movieData.cast.length > 0 && (
        <div className="cast-list-container">
          <CastList cast={movieData.cast} />
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
