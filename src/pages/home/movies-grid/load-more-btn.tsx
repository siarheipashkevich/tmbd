import { memo, useContext } from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';

import { ScrollerContext } from '@/components/scroller/scroller-context';
import { Button } from '@/components/button';

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
    <Button
      ref={ref}
      className="my-4 w-full"
      variant={focused ? 'focused' : 'default'}
      size="lg"
      onClick={() => {
        focusSelf();
        handleClick();
      }}
    >
      Load more
    </Button>
  );
}

export default memo(LoadMoreBtn);
