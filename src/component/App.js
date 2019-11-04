import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";


const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"; // you should replace this with yours


const App = () => {
  const [loading, setLoading] = useState(true); // hooks
  const [movies, setMovies] = useState([]); // hooks
  const [errorMessage, setErrorMessage] = useState(null); // hooks

  // If you’re familiar with React class lifecycle methods, you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined.
  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };
    
  return (
    <div className="App">
      <Header text="React Movie Demo" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
         <span>loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};


export default App;