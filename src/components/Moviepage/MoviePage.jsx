import React from "react";

export default function MoviePage({ movieInfo }) {
  return (
    <div>
      <p className="pt-10 pb-4 text-5xl">{movieInfo.title}</p>
      <div className="flex p-10">
        <img
          className="rounded ml-4"
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
    </div>
  );
}
