import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieName, movieResults } = useSelector((store) => store.gpt);
  if (!movieName) return null;

  return (
    <div className="m-4 p-4 bg-black opacity-90 text-white">
      <div className="">
        {movieName.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
