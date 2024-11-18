import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '.';

const global = (state: RootState) => state.global;

export const selectMovies = createSelector(global, (state) => state.movies.items);
export const selectMoviesLoading = createSelector(global, (state) => state.movies.loading);
export const selectMoviesError = createSelector(global, (state) => state.movies.error);
export const selectMoviesFilter = createSelector(global, (state) => state.movies.filter);

export const selectMovie = createSelector(global, (state) => state.movie.item);
export const selectMovieLoading = createSelector(global, (state) => state.movie.loading);
export const selectMovieError = createSelector(global, (state) => state.movie.error);
