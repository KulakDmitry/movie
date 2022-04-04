import React, { Suspense, useEffect, useReducer } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import ReactPaginate from "react-paginate";
import { movieDataActionTypes, reducer } from "./reducer";

const api_key = process.env.REACT_APP_API_KEY;

const TOTAL_COUNT_PAGES = 500;

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, {
    movies: [],
    currentPage: 1,
  });

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    fetchData(params.page);
  }, []);

  async function fetchData(page = 1) {
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

      dispatch({
        type: movieDataActionTypes.SET_MOVIE_PAGE_DATA,
        payload: {
          movies: response.data.results,
          currentPage: page,
        },
      });

      navigate(`/page/${page}`);
    } catch (error) {
      console.log(error);
    }
  }
  const { currentPage, movies } = state;

  return (
    <>
      <h1 className="text-center text-4xl mt-10">Most popular movies</h1>
      <Suspense fallback={<Spinner />}>
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
                  alt="Movie poster"
                />
                <p className="px-10 py-2">{movie.title}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mb-16 mt-4">
            <ReactPaginate
              className="flex items-center justify-center"
              pageClassName="hover:bg-gray-400 rounded-md bg-gray-300 px-3 m-1 cursor-pointer"
              disabledClassName="cursor-default opacity-50 bg-gray-300 hover:bg-gray-300"
              disabledLinkClassName="cursor-default opacity-50 bg-gray-300 hover:bg-gray-300"
              activeLinkClassName="cursor-default"
              activeClassName="cursor-default opacity-50 bg-gray-300 hover:bg-gray-300"
              previousClassName="hover:bg-gray-400 rounded-md bg-gray-300 px-3 m-1"
              nextClassName="hover:bg-gray-400 rounded-md bg-gray-300 px-3 m-1"
              previousLabel="previous"
              nextLabel="next"
              breakLabel="..."
              breakClassName="hover:bg-gray-400 rounded-md bg-gray-300 px-3 m-1"
              pageCount={TOTAL_COUNT_PAGES}
              marginPagesDisplayed={1}
              pageRangeDisplayed={5}
              onPageChange={(event) => fetchData(event.selected + 1)}
              forcePage={currentPage - 1}
            />
          </div>
        </>
      </Suspense>
    </>
  );
}
