import { memo } from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';

import { useAppDispatch } from '@/store/hooks';
import { addFavoriteAction, removeFavoriteAction } from '@/store/global-slice';
import FavoriteLabel from '@/components/favorite-label';
import { ImageService } from '@/services/image-service';
import { cn } from '@/utils';
import { Movie } from '@/types';

interface MovieInfoProps {
  movie: Movie;
  isFavorite: boolean;
}

function MovieInfo({ movie, isFavorite }: MovieInfoProps) {
  const dispatch = useAppDispatch();

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavoriteAction(movie.id));
    } else {
      dispatch(addFavoriteAction(movie));
    }
  };

  const { ref, focused, focusSelf } = useFocusable({
    onEnterPress: handleToggleFavorite,
  });

  return (
    <div className="pb-4 flex flex-row items-start">
      {movie.poster_path && (
        <div className="shrink-0 w-[300px] relative">
          {isFavorite && <FavoriteLabel />}
          <img
            src={ImageService.getFullSrc(movie.poster_path)}
            alt={movie.title}
            className="w-full object-cover"
          />
        </div>
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
        <div
          ref={ref}
          className={cn('my-4 py-2 px-4 inline-block cursor-pointer rounded bg-slate-200', {
            'bg-sky-400 text-white': focused,
          })}
          onClick={() => {
            focusSelf();
            handleToggleFavorite();
          }}>
          {isFavorite ? 'Remove From Favorites' : 'Add To Favorite'}
        </div>
      </div>
    </div>
  );
}

export default memo(MovieInfo);
