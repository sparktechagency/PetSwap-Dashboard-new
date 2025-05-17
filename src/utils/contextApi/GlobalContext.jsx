import React, { createContext, useContext, useState } from 'react';

// Create the context
export const GlobalContext = createContext();

// Create the provider component
export const GlobalProvider = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState(0);

  return (
    <GlobalContext.Provider value={{ activeScreen, setActiveScreen }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
