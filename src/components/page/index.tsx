import { memo, ReactNode } from 'react';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';

interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => {
  const { ref, focusKey } = useFocusable();

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="container mx-auto px-4">
        {children}
      </div>
    </FocusContext.Provider>
  );
};

export default memo(Page);
