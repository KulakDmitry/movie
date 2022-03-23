import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const api_key = process.env.REACT_APP_API_KEY;

export default function MoviePage({ isLoading, setIsLoading }) {
  const [movieInfo, setMovieInfo] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetchMovieData(params.id);
  }, []);

  async function fetchMovieData(id) {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
          params: {
            api_key: api_key,
          },
        }
      );
      setMovieInfo(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <section>
          <p className="pt-10 pb-4 text-5xl text-center">{movieInfo.title}</p>
          <div className="flex p-10">
            <img
              className="rounded ml-4 w-[400px]"
              src={`http://image.tmdb.org/t/p/w400/${movieInfo.poster_path}`}
            />
            <div className="text-left px-10">
              <p className="py-2 text-lg">{movieInfo.overview}</p>
              <div className="mt-10">
                <p className="py-2">
                  Genres:
                  {movieInfo?.genres?.map((genre, index) => (
                    <span key={index} className="pl-2">
                      {genre.name}
                    </span>
                  ))}
                </p>

                <p className="py-2">Vote Average: {movieInfo.vote_average}</p>
                <p className="py-2">Release Date: {movieInfo.release_date}</p>
                <p className="py-2">Duration: {movieInfo.runtime} minutes</p>
                <p className="py-2">Budget: {movieInfo.budget}$</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
