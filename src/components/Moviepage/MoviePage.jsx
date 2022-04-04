import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const api_key = process.env.REACT_APP_API_KEY;

export default function MoviePage() {
  const [movieInfo, setMovieInfo] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetchMovieData(params.id);
  }, []);

  async function fetchMovieData(id) {
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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Suspense fallback={<Spinner />}>
      <article>
        <p className="pt-10 pb-4 text-5xl text-center">{movieInfo.title}</p>
        <div className="flex p-10">
          <img
            className="rounded ml-4 w-[400px]"
            src={`http://image.tmdb.org/t/p/w400/${movieInfo.poster_path}`}
            alt="Movie poster"
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
      </article>
    </Suspense>
  );
}
