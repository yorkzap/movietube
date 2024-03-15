import React from 'react';

function MovieSearchForm({ query, isLoading, handleInputChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a movie..."
        className="search-input"
        style={{ color: 'black' }}
      />
    </form>
  );
}

export default MovieSearchForm;
