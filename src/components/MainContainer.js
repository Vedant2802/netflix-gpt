import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  if (!movies) return;
  // if (!movies || movies.length === 0) {
  //   return <div>Loading...</div>; // Show loading or placeholder
  // }
  const mainMovies = movies[1];
  const { original_title, overview, id } = mainMovies;
  console.log("first", id);

  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
