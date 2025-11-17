import { createContext, useContext } from 'react';
export enum PageWidth {
  SMALL = 768,
  MEDIUM = 1024,
  LARGE = 1280,
  MAX = 1536,
}
export type PageContextType = {
  page: number
};

export const PageContext = createContext<PageContextType>({
  page: 0,
});

export const usePageContext = () => useContext<PageContextType>(PageContext);
export const PageConTextProvider = PageContext.Provider;
