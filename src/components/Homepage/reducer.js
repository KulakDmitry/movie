const movieDataActionTypes = {
  SET_MOVIE_PAGE_DATA: "SET_MOVIE_PAGE_DATA",
};

function reducer(state, action) {
  switch (action.type) {
    case movieDataActionTypes.SET_MOVIE_PAGE_DATA:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        movies: action.payload.movies,
      };

    default: {
      return state;
    }
  }
}

export { reducer, movieDataActionTypes };
