import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../constants/languageConstants";
import openai from "../utils/openAi";
import { API_OPTIONS } from "../constants/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();

  //search movie in tmdb database

  // since this is an async function it will not directly return me a result it will return me a promise and then we await for the result
  const searchMovieInTmdb = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();
    // console.log(json);
    // console.log(json.results);
    return json.results;
  };

  const handleGptSearch = async () => {
    console.log("first", searchText.current.value);
    // make an api call to gpt api and get the results
    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query" +
      searchText.current.value +
      "only give me names of 5 movies, comma seperated example: munna bhai mbbs,sholay,Pk, 3 idiots like this";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults) {
      //todo Error handling
    }

    // console.log("gpt result", gptResults.choices?.[0]?.message?.content);
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(","); //using split will give me an array of comma seperated string

    // dispatch(gptSearchResults(gptMovies));
    //for each movie i will find out the details in the tmdb search api

    const promisArray = gptMovies.map((movie) => searchMovieInTmdb(movie));
    //[5 promises]

    const tmdbResult = await Promise.all(promisArray);

    console.log("tmdb result", tmdbResult);

    dispatch(
      addGptMovieResult({ movieName: gptMovies, movieResults: tmdbResult })
    );
  };
  const searchText = useRef(null);

  return (
    <div className="pt-[8%] flex justify-center">
      <form
        className=" w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 rounded-lg col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        ></input>
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearch}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
