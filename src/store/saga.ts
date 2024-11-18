import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { MovieService } from '@/services/movie-service';
import { Movie } from '@/types';
import { selectMoviesFilter } from './selectors';
import {
  fetchMovieAction,
  fetchMovieFailureAction,
  fetchMoviesAction,
  fetchMoviesFailureAction,
  fetchMoviesSuccessAction,
  fetchMovieSuccessAction,
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

export default function* saga() {
  yield takeLatest(fetchMoviesAction.type, fetchMovies);
  yield takeLatest(fetchMovieAction.type, fetchMovie);
}
