import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // we have to add this condition since the movies is being populated through an asynchronous operation , if you do not do this it might try to access the data as soon as the component renders , in that case the movies object might be empty or null which was the initial state
  if (!movies) {
    return <div>Loading...</div>; // Display until `movies` is passed
  }
  return (
    <div className="px-6">
      <h1 className="text-3xl md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies.map((movie) => {
            return <MovieCard key={movie.id} posterPath={movie.poster_path} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
