import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectMovies, selectMoviesError, selectMoviesFilter, selectMoviesLoading } from '@/store/selectors';
import { fetchMoviesAction } from '@/store/global-slice';
import Page from '@/components/page';
import Scroller from '@/components/scroller';
import Loader from '@/components/loader';
import Error from '@/components/error';
import usePreviousValue from '@/hooks/previous-value';
import Filters from './filters';
import MoviesGrid from './movies-grid';

export function HomePage() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectMoviesLoading);
  const error = useAppSelector(selectMoviesError);
  const movies = useAppSelector(selectMovies);
  const filter = useAppSelector(selectMoviesFilter);
  const prevFilter = usePreviousValue(filter);

  useEffect(() => {
    if (prevFilter !== filter) {
      dispatch(fetchMoviesAction());
    }
  }, [prevFilter, filter]);

  return (
    <Scroller>
      <Page>
        <Filters />
        <Error error={error} />
        {loading ? <Loader /> : <MoviesGrid movies={movies} />}
      </Page>
    </Scroller>
  );
}
