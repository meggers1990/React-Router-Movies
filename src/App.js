import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import SavedList from './Movies/SavedList';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/movies') // Replace this URL with the correct endpoint for your API
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }, []);

  const addToSavedList = id => {
    const movie = movies.find(movie => movie.id === id);
    if (!movie) return;

    const isAlreadySaved = savedMovies.some(savedMovie => savedMovie.id === id);
    if (isAlreadySaved) return;

    setSavedMovies(prevSavedMovies => [...prevSavedMovies, movie]);
    console.log('Movie with ID ' + id + ' saved.');
  };

  return (
    <Router>
      <div>
        <SavedList list={savedMovies} />
        <Route exact path="/" render={props => <MovieList {...props} movies={movies} />} />
        <Route path="/movies/:id" render={props => <Movie {...props} addToSavedList={addToSavedList} />} />
      </div>
    </Router>
  );
}