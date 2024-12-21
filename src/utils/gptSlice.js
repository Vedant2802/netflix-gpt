import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieName: null,
    movieResults: null,
  },
  reducers: {
    toggleGptSearchView: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },

    addGptMovieResult: (state, action) => {
      const { movieName, movieResults } = action.payload;
      state.movieName = movieName;
      state.movieResults = movieResults;
    },
  },

  //   gptSearchResults: (state, action) => {
  //     const { movieName, movieResults } = action.payload;
  //     state.movieName = movieName;
  //     state.movieResults = movieResults;
  //   },
  // },
});

export default gptSlice.reducer;
export const { toggleGptSearchView, addGptMovieResult, gptSearchResults } =
  gptSlice.actions;
