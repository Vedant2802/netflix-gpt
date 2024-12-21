import React from "react";
import { IMG_CDN } from "../constants/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-52 pr-4">
      <img alt="movie card" src={IMG_CDN + posterPath} />
    </div>
  );
};

export default MovieCard;
