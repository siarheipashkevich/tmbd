import { memo, ReactNode, useEffect, useMemo } from 'react';
import {
  FocusableComponentLayout,
  FocusContext,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';

import { ScrollerContext } from './scroller-context';

interface ScrollerProps {
  className?: string;
  children: ReactNode;
  getScrollerElement?: (ref: HTMLDivElement) => void;
}

const Scroller = ({ children, getScrollerElement = undefined }: ScrollerProps) => {
  const { ref, focusKey } = useFocusable();

  useEffect(() => {
    if (getScrollerElement) {
      getScrollerElement(ref.current);
    }
  }, []);

  const scrollerContextValue = useMemo(() => ({
    onItemFocus({ y, height }: FocusableComponentLayout) {
      const scrollerElement = ref.current;

      if (scrollerElement) {
        scrollerElement.scrollTo({
          top: y - scrollerElement.clientHeight / 2 + height,
          behavior: 'smooth',
        });

        // if needed to support legacy devices where scrollTo is not working then we can use the code below
        // scrollerElement.scrollTop = y - scrollerElement.clientHeight / 2 + height;
      }
    },
  }), []);

  return (
    <ScrollerContext.Provider value={scrollerContextValue}>
      <FocusContext.Provider value={focusKey}>
        <div ref={ref} className="h-full overflow-y-auto">
          {children}
        </div>
      </FocusContext.Provider>
    </ScrollerContext.Provider>
  );
};

export default memo(Scroller);
