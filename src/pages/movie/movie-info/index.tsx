import { memo } from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';

import { useAppDispatch } from '@/store/hooks';
import { addFavoriteAction, removeFavoriteAction } from '@/store/global-slice';
import FavoriteLabel from '@/components/favorite-label';
import { Button } from '@/components/button';
import { ImageService } from '@/services/image-service';
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
        <Button
          ref={ref}
          className="my-4"
          variant={focused ? 'focused' : 'default'}
          onClick={() => {
            focusSelf();
            handleToggleFavorite();
          }}>
          {isFavorite ? 'Remove From Favorites' : 'Add To Favorite'}
        </Button>
      </div>
    </div>
  );
}

export default memo(MovieInfo);
