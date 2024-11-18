import { memo } from 'react';

import { ImageService } from '@/services/image-service';
import { Movie } from '@/types';

interface MovieInfoProps {
  movie: Movie;
}

function MovieInfo({ movie }: MovieInfoProps) {
  return (
    <div className="pb-4 flex flex-row items-start">
      {movie.poster_path && (
        <img
          src={ImageService.getFullSrc(movie.poster_path)}
          alt={movie.title}
          className="w-[300px]"
        />
      )}
      <div className="pl-4">
        <div className="font-bold text-xl">{movie?.title}</div>
        {movie.genres.length > 0 && (
          <div className="flex flex-row gap-x-2 pt-3">
            {movie.genres.map(({ id, name }) => (
              <div key={id} className="rounded py-1 px-2 bg-slate-200 text-slate-500 text-sm">
                {name}
              </div>
            ))}
          </div>
        )}
        <div className="pt-3 text-slate-500">{movie.overview}</div>
      </div>
    </div>
  );
}

export default memo(MovieInfo);
