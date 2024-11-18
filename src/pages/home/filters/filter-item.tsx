import { memo } from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';

import { useAppDispatch } from '@/store/hooks';
import { setMoviesFilterAction } from '@/store/global-slice';
import { cn } from '@/utils';
import { Filter } from '@/types';

interface FilterItemProps {
  type: Filter;
  label: string;
  isActive: boolean;
}

export function FilterItem({ type, label, isActive }: FilterItemProps) {
  const dispatch = useAppDispatch();

  const handleChangeFilter = () => {
    dispatch(setMoviesFilterAction(type));
  };

  const { ref, focused, focusSelf } = useFocusable({
    onEnterPress: handleChangeFilter,
  });

  return (
    <div
      ref={ref}
      className={cn('py-2 px-4 rounded cursor-pointer', {
        'bg-slate-200': isActive,
        'bg-sky-400 text-white': focused,
      })}
      onClick={() => {
        focusSelf();
        handleChangeFilter();
      }}
    >
      {label}
    </div>
  );
}

export default memo(FilterItem);
