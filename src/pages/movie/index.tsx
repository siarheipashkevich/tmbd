import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { selectFavorites, selectMovie, selectMovieError, selectMovieLoading } from '@/store/selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMovieAction } from '@/store/global-slice';
import { MovieService } from '@/services/movie-service';
import Page from '@/components/page';
import Loader from '@/components/loader';
import Error from '@/components/error';
import EmptyPlaceholder from '@/components/empty-placeholder';
import { Movie } from '@/types';
import BackBtn from './back-btn';
import MovieInfo from './movie-info';

export function MoviePage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectMovieLoading);
  const error = useAppSelector(selectMovieError);
  const movie = useAppSelector(selectMovie);
  const favorites = useAppSelector(selectFavorites);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieAction(id as unknown as Movie['id']));
    }
  }, [id, dispatch]);

  return (
    <Page>
      <BackBtn />
      <Error error={error} />
      {loading ? <Loader /> : (
        movie
          ? <MovieInfo movie={movie} isFavorite={MovieService.isMovieFavorite(favorites, movie.id)} />
          : <EmptyPlaceholder text="Movie is not found." />
      )}
    </Page>
  );
}
