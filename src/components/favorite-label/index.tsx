import { memo } from 'react';

const FavoriteLabel = () => {
  return (
    <span className="absolute top-2 right-2 bg-orange-400 rounded py-0.5 px-2 text-white">favorited</span>
  );
};

export default memo(FavoriteLabel);
