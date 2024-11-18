import { memo, useEffect } from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';

import { useAppSelector } from '@/store/hooks';
import { selectMoviesFilter } from '@/store/selectors';
import { Filter } from '@/types';
import { FilterItem } from './filter-item';

const filters: { key: Filter; label: string }[] = [
  {
    key: 'popular',
    label: 'Popular', // i18n
  },
  {
    key: 'now',
    label: 'Now Playing', // i18n
  },
  {
    key: 'favorites',
    label: 'Favorites', // i18n
  },
];

export function Filters() {
  const { ref, focusKey, focusSelf } = useFocusable();
  const selectedFilter = useAppSelector(selectMoviesFilter);

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="flex flex-row gap-x-4 my-4">
        {filters.map((filter) => (
          <FilterItem
            key={filter.key}
            type={filter.key}
            label={filter.label}
            isActive={filter.key === selectedFilter}
          />
        ))}
      </div>
    </FocusContext.Provider>
  );
}

export default memo(Filters);
