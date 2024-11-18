import { createContext } from 'react';
import { FocusHandler } from '@noriginmedia/norigin-spatial-navigation/dist/useFocusable';

interface ScrollerContextType {
  onItemFocus: FocusHandler;
}

export const ScrollerContext = createContext({} as ScrollerContextType);
