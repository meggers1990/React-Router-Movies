import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { useParams } from 'react-router-dom';

export default function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/movies/${id}`) // Replace this URL with the correct endpoint for your API
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  return (
    <div>
      <MovieCard movie={movie} addToSavedList={addToSavedList} />
    </div>
  );
}
