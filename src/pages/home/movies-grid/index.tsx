import { memo } from 'react';

import { useAppSelector } from '@/store/hooks';
import { selectFavorites } from '@/store/selectors';
import { MovieService } from '@/services/movie-service';
import { Movie } from '@/types';
import MovieCard from './movie-card';
import LoadMoreBtn from './load-more-btn';

interface MoviesGridProps {
  movies: Movie[];
}

export function MoviesGrid({ movies }: MoviesGridProps) {
  const favorites = useAppSelector(selectFavorites);

  if (movies.length === 0) {
    return (
      <div className="text-center p-2 text-gray-400">The list of movies is empty.</div>
    );
  }

  return (
    <>
      <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={MovieService.isMovieFavorite(favorites, movie.id)}
          />
        ))}
      </div>
      <LoadMoreBtn />
    </>
  );
}

export default memo(MoviesGrid);
