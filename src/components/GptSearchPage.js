import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { LOGIN_LOGO } from "../constants/constants";

const GptSearchPage = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img
          // className="w-44 h-44 mx-auto"
          src={LOGIN_LOGO}
          alt="background"
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearchPage;
