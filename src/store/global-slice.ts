import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MovieService } from '@/services/movie-service';
import { Filter, Movie } from '@/types';

interface GlobalSlice {
  favorites: Movie[];
  movies: {
    loading: boolean;
    items: Movie[];
    error: string;
    filter: Filter;
  };
  movie: {
    loading: boolean;
    item: Movie | null;
    error: string;
  };
}

const initialState: GlobalSlice = {
  favorites: MovieService.getFavorites(),
  movies: {
    loading: false,
    items: [],
    error: '',
    filter: 'popular',
  },
  movie: {
    loading: false,
    item: null,
    error: '',
  },
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    fetchMoviesAction(state) {
      state.movies.loading = true;
    },
    fetchMoviesSuccessAction(state, { payload: movies }: PayloadAction<Movie[]>) {
      state.movies.loading = false;
      state.movies.items = movies;
    },
    fetchMoviesFailureAction(state, { payload }: PayloadAction<string>) {
      state.movies.loading = false;
      state.movies.error = payload;
    },
    setMoviesFilterAction(state, { payload }: PayloadAction<Filter>) {
      state.movies.filter = payload;
    },

    // @ts-expect-error unused variable
    fetchMovieAction(state, { payload }: PayloadAction<Movie['id']>) {
      state.movie.loading = true;
    },
    fetchMovieSuccessAction(state, { payload: movie }: PayloadAction<Movie>) {
      state.movie.loading = false;
      state.movie.item = movie;
    },
    fetchMovieFailureAction(state, { payload }: PayloadAction<string>) {
      state.movie.loading = false;
      state.movie.error = payload;
    },

    addFavoriteAction(state, { payload }: PayloadAction<Movie>) {
      state.favorites.push(payload);
    },
    removeFavoriteAction(state, { payload: movieId }: PayloadAction<Movie['id']>) {
      state.favorites = state.favorites.filter((favoriteMovie) => favoriteMovie.id !== movieId);
    },
  },
});

export const {
  fetchMoviesAction,
  fetchMoviesSuccessAction,
  fetchMoviesFailureAction,
  setMoviesFilterAction,
  fetchMovieAction,
  fetchMovieSuccessAction,
  fetchMovieFailureAction,
  addFavoriteAction,
  removeFavoriteAction,
} = globalSlice.actions;

export default globalSlice.reducer;
