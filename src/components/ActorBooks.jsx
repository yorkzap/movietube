import React, { useState, useEffect } from 'react';
import './ActorBooks.css';
import LoadingIndicator from './LoadingIndicator';

function ActorBooks({ actorName }) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://openlibrary.org/search.json?q=${actorName.replace(' ', '+')}`);
        const data = await response.json();
        setBooks(data.docs.slice(0, 4)); // Limiting to the first 4 books
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [actorName]);

  return (
    <div className="actor-books-container">
      <h2 className="actor-books-heading">Books Related to {actorName}</h2>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div className="actor-books">
          {books.map((book, index) => (
            <div className="actor-book" key={index}>
              <h3 className="actor-book-title">{book.title}</h3>
              <div className="actor-book-details">
                <p className="actor-book-details-item">Author(s): {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
                <p className="actor-book-details-item">Published Year: {book.publish_year ? book.publish_year.join(', ') : 'Unknown'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActorBooks;
