import { createContext, useState, ReactNode } from 'react';

const defaultLoadingContext = {
  loaded: true,
  setLoaded: (object) => {},
};

export const isLoadedContext = createContext(defaultLoadingContext);

type LoadingProviderType = {
  children: ReactNode;
};

export function LoadingProvider({ children }: LoadingProviderType) {
  const setLoaded = (loading) => {
    setLoadingState({ loaded: loading, setLoaded });
  };

  const initialLoadingState = { ...defaultLoadingContext, setLoaded };

  const [isLoadedState, setLoadingState] = useState(initialLoadingState);

  return (
    <isLoadedContext.Provider value={isLoadedState}>
      {children}
    </isLoadedContext.Provider>
  );
}
