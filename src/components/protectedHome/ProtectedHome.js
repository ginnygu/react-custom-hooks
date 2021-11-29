import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MovieHooks from "../../hooks/MovieHooks";
function ProtectedHome() {
  let [, setmovieInput, movieArray, setSubmit] = MovieHooks();

  function handleMovieSubmit() {
    setSubmit(true);
  }

  async function handleAddFavorite(movieDetail) {
    try {
      let payload = await axios.post(
        `http://localhost:3001/api/movie/add-favorite-movie`,
        {
          title: movieDetail.Title,
          poster: movieDetail.Poster,
          rating: movieDetail.Rating,
        },
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
          },
        }
      );

      console.log(payload);
    } catch (e) {
      console.log(e.response);
    }
  }

  return (
    <div>
      ProtectedHome
      <div>
        <input onChange={(e) => setmovieInput(e.target.value)} />
        <button onClick={handleMovieSubmit}>Submit</button>
      </div>
      <div>
        {movieArray.map((item) => {
          return (
            <div key={item.data.imdbID}>
              <img src={item.data.Poster} />
              <Link to={`/protected-movie-detail/${item.data.imdbID}`}>
                {" "}
                <h1>{item.data.Title}</h1>
              </Link>
              <span>{item.data.imdbRating}</span>
              <button onClick={() => handleAddFavorite(item.data)}>
                Add to favorite
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProtectedHome;
