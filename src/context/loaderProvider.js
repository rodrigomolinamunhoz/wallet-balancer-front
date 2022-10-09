import React, { createContext, useCallback, useState, useContext } from 'react';
import Loader from '../components/Loader';
const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const setLoader = useCallback(loading => {
    setLoading(loading);
  }, []);

  return (
    <LoaderContext.Provider value={{ isLoading, setLoader }}>
      {children}
      {isLoading && <Loader />}
    </LoaderContext.Provider>
  );
};

export function useLoader() {
  const context = useContext(LoaderContext);
  return context;
}
