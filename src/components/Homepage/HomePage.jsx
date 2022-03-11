import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");

const api_key = process.env.REACT_APP_API_KEY;

export default function HomePage({ setMovieInfo }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchMovieData(id) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          api_key: api_key,
        },
      }
    );
    console.log(response);
    setMovieInfo(response.data);
  }

  async function fetchData() {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: api_key,
        },
      }
    );
    setMovies(response.data.results);
  }

  return (
    <>
      <h1 className="text-4xl mt-10">Most popular movies</h1>
      <div className="mt-20 grid gap-y-10 grid-cols-5">
        {movies.map((movie) => (
          <Link
            to={`movie/${movie.id}`}
            onClick={() => fetchMovieData(movie.id)}
            key={movie.id}
            className="flex items-center flex-col hover:scale-110 transition duration-300"
          >
            <img
              className="rounded"
              src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
            />
            <p className="px-10 py-2">{movie.title}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
