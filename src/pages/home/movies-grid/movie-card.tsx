import { memo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';

import FavoriteLabel from '@/components/favorite-label';
import { ScrollerContext } from '@/components/scroller/scroller-context';
import { ImageService } from '@/services/image-service';
import { cn } from '@/utils';
import { Movie } from '@/types';

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
}

function MovieCard({ movie, isFavorite }: MovieCardProps) {
  const navigate = useNavigate();
  const { onItemFocus } = useContext(ScrollerContext);

  const handleOpenMovie = () => {
    navigate(`/movie/${movie.id}`, {
      state: { canGoBack: true },
    });
  };

  const { ref, focused } = useFocusable({
    onFocus: onItemFocus,
    onEnterPress: handleOpenMovie,
  });

  return (
    <div
      ref={ref}
      className={cn('border rounded-md overflow-hidden shadow-md duration-100 hover:-translate-y-1 cursor-pointer relative', {
        '-translate-y-1': focused,
      })}
      onClick={handleOpenMovie}
    >
      {isFavorite && <FavoriteLabel />}
      {movie.poster_path && (
        <img
          src={ImageService.getFullSrc(movie.poster_path)}
          alt={movie.title}
          className="w-full min-h-72 object-cover"
        />
      )}
      <div className={cn('p-3 font-bold', { 'text-sky-500': focused })}>
        {movie.title}
      </div>
    </div>
  );
}

export default memo(MovieCard);
