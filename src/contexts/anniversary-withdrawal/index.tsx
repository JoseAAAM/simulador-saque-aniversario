import React, { createContext, useContext, useState } from 'react';

export type AnniversaryWithdrawalContextType = {
  data: { name: string; amount: number };
  saveFormData({ name, amount }: { name: string; amount: number }): void;
};

export const AnniversaryWithdrawalContext = createContext(
  {} as AnniversaryWithdrawalContextType,
);

interface AnniversaryWithdrawalProviderProps {
  children: React.ReactNode;
}

export const AnniversaryWithdrawalProvider: React.FC<
  AnniversaryWithdrawalProviderProps
> = ({ children }) => {
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
    <AnniversaryWithdrawalContext.Provider
      value={{
        data,
        saveFormData,
      }}
    >
      {children}
    </AnniversaryWithdrawalContext.Provider>
  );
};

export function useAnniversaryWithdrawal(): AnniversaryWithdrawalContextType {
  const anniversaryWithdrawalContext = useContext(AnniversaryWithdrawalContext);

  if (!AnniversaryWithdrawalContext) {
    throw new Error(
      'useAnniversaryWithdrawal must be used within a AnniversaryWithdrawalProvider',
    );
  }

  return anniversaryWithdrawalContext;
}
