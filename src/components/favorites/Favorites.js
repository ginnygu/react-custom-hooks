import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Favorites() {
  const [favoriteArray, setFavoriteArray] = useState([]);

  useEffect(() => {
    fetchFavoriteMovies();
  }, []);

  async function fetchFavoriteMovies() {
    try {
      let url =
        process.env.NODE_ENV === "production"
          ? "https://team-2-movie-backend.herokuapp.com/api/movie/get-favorites-movies"
          : "http://localhost:3001/api/movie/get-favorites-movies";

      let payload = await axios.get(url, {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
        },
      });

      setFavoriteArray(payload.data.payload);
    } catch (e) {
      console.log(e.response);
    }
  }

  async function handleDelete(movieID) {
    try {
      let url =
        process.env.NODE_ENV === "production"
          ? `https://team-2-movie-backend.herokuapp.com/api/movie/delete-by-id/${movieID}`
          : `http://localhost:3001/api/movie/delete-by-id/${movieID}`;

      let payload = await axios.delete(url, {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
        },
      });

      let newFavoriterMovie = [...favoriteArray];

      let filteredMovieArray = newFavoriterMovie.filter(
        (item) => item._id !== payload.data.payload._id
      );

      setFavoriteArray(filteredMovieArray);
    } catch (e) {
      console.log(e.response);
    }
  }

  return (
    <div>
      {favoriteArray.map((item) => {
        return (
          <div key={item._id}>
            <img src={item.poster} />

            <h1>{item.title}</h1>

            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default Favorites;
