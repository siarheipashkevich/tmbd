import { memo } from 'react';

import { Movie } from '@/types';
import MovieCard from './movie-card';
import LoadMoreBtn from './load-more-btn';

interface MoviesGridProps {
  movies: Movie[];
}

export function MoviesGrid({ movies }: MoviesGridProps) {
  return movies.length > 0 && (
    <>
      <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <LoadMoreBtn />
    </>
  );
}

export default memo(MoviesGrid);
