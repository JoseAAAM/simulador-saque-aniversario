import React, { createContext, useContext, useState } from 'react';

export type FgtsContextType = {
  data: { name: string; amount: number };
  saveFormData({ name, amount }: { name: string; amount: number }): void;
};

export const FgtsContext = createContext({} as FgtsContextType);

interface FgtsProviderProps {
  children: React.ReactNode;
}

export const FgtsProvider: React.FC<FgtsProviderProps> = ({ children }) => {
  const [data, setData] = useState({
    name: '',
    amount: 0,
  });

  function saveFormData({ name, amount }: { name: string; amount: number }) {
    setData({
      name,
      amount,
    });
  }

  return (
    <FgtsContext.Provider
      value={{
        data,
        saveFormData,
      }}
    >
      {children}
    </FgtsContext.Provider>
  );
};

export function useFgts(): FgtsContextType {
  const fgtsContext = useContext(FgtsContext);

  if (!fgtsContext) {
    throw new Error('useFgts must be used within a FgtsProvider');
  }

  return fgtsContext;
}
