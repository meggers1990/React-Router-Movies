import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie, addToSavedList }) {
  const { title, director, metascore, stars } = movie;

  return (
    <div className="movie-card">
      <Link to={`/movies/${movie.id}`} className="movie-title">
        <h2>{title}</h2>
      </Link>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>
      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      {addToSavedList && (
        <button onClick={() => addToSavedList(movie.id)} className="save-button">
          Save
        </button>
      )}
    </div>
  );
}
