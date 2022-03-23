import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

const api_key = process.env.REACT_APP_API_KEY;

export default function HomePage({ isLoading, setIsLoading }) {
  const [movies, setMovies] = useState([]);
  const [totalCountPages, setTotalCountPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const params = useParams();
  console.log(params);

  useEffect(() => {
    fetchData();
    fetchPageData(params.page);
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        {
          params: {
            api_key: api_key,
          },
        }
      );
      setTotalCountPages(response.data.total_pages);
      setMovies(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchPageData(page = 1) {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        {
          params: {
            api_key: api_key,
            page: page,
          },
        }
      );
      setCurrentPage(page);
      setMovies(response.data.results);
      setIsLoading(false);
      navigate(`/page/${page}`);
    } catch (error) {
      console.log(error);
    }
  }

  let pagesArray = [];
  for (let page = 0; page < totalCountPages; page++) {
    pagesArray.push(page + 1);
  }

  console.log(currentPage);

  return (
    <>
      <h1 className="text-center text-4xl mt-10">Most popular movies</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="mt-20 grid gap-y-10 grid-cols-5">
            {movies.map((movie) => (
              <Link
                to={`movie/${movie.id}`}
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
          <div className="text-center mb-16 mt-4">
            {pagesArray.slice(0, 10).map((page, index) => (
              <button
                key={index}
                onClick={() => fetchPageData(page)}
                className="hover:bg-gray-400 rounded-md bg-gray-300 disabled:opacity-50 disabled:bg-gray-300 px-3 m-1"
                disabled={currentPage === page}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}
