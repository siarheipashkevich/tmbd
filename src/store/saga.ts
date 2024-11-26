import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { MovieService } from '@/services/movie-service';
import Storage from '@/utils/storage';
import { Movie } from '@/types';
import { selectMoviesFilter } from './selectors';
import {
  addFavoriteAction,
  fetchMovieAction,
  fetchMovieFailureAction,
  fetchMoviesAction,
  fetchMoviesFailureAction,
  fetchMoviesSuccessAction,
  fetchMovieSuccessAction,
  removeFavoriteAction,
} from './global-slice';

function* fetchMovies() {
  const filter: ReturnType<typeof selectMoviesFilter> = yield select(selectMoviesFilter);

  try {
    const movies: Awaited<ReturnType<typeof MovieService.fetchMovies>> = yield call(MovieService.fetchMovies, filter);

    // todo: validate incoming data by schema (zod or any alternative libraries)

    yield put(fetchMoviesSuccessAction(movies));
  } catch (error) {
    yield put(fetchMoviesFailureAction((error as Error).message));
  }
}

function* fetchMovie({ payload: movieId }: PayloadAction<Movie['id']>) {
  try {
    const movie: Awaited<ReturnType<typeof MovieService.fetchMovie>> = yield call(MovieService.fetchMovie, movieId);

    // todo: validate incoming data by schema (zod or any alternative libraries)

    yield put(fetchMovieSuccessAction(movie));
  } catch (error) {
    yield put(fetchMovieFailureAction((error as Error).message));
  }
}

function addFavorite({ payload: movie }: PayloadAction<Movie>) {
  const favorites = MovieService.getFavorites();

  if (!MovieService.isMovieFavorite(favorites, movie.id)) {
    Storage.set('favorites', [...favorites, movie]);
  }
}

function removeFavorite({ payload: movieId }: PayloadAction<Movie['id']>) {
  const favorites = MovieService.getFavorites();

  Storage.set('favorites', favorites.filter((favorite) => favorite.id !== movieId));
}

export default function* saga() {
  yield takeLatest(fetchMoviesAction.type, fetchMovies);
  yield takeLatest(fetchMovieAction.type, fetchMovie);
  yield takeLatest(addFavoriteAction.type, addFavorite);
  yield takeLatest(removeFavoriteAction.type, removeFavorite);
}
