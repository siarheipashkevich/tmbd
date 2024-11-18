import { memo, useContext } from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';

import { ScrollerContext } from '@/components/scroller/scroller-context';
import { cn } from '@/utils';

function LoadMoreBtn() {
  const { onItemFocus } = useContext(ScrollerContext);

  const handleClick = () => {
    alert('Not implemented yet...')
  };

  const { ref, focused, focusSelf } = useFocusable({
    onFocus: onItemFocus,
    onEnterPress: handleClick,
  });

  return (
    <div
      ref={ref}
      className={cn('my-4 py-2 px-4 rounded text-center cursor-pointer bg-slate-200', {
        'bg-sky-400 text-white': focused,
      })}
      onClick={() => {
        focusSelf();
        handleClick();
      }}
    >
      Load more
    </div>
  );
}

export default memo(LoadMoreBtn);
