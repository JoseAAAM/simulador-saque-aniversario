import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type AnniversaryWithdrawalContextType = {
  data: { name: string; amount: number };
  saveFormData({ name, amount }: { name: string; amount: number }): void;
  isLoading: boolean;
};

export const AnniversaryWithdrawalContext = createContext(
  {} as AnniversaryWithdrawalContextType,
);

interface AnniversaryWithdrawalProviderProps {
  children: React.ReactNode;
}

const SESSION_STORAGE_KEY = '@anniversary-withdrawal-data';

export const AnniversaryWithdrawalProvider: React.FC<
  AnniversaryWithdrawalProviderProps
> = ({ children }) => {
  const [data, setData] = useState({
    name: '',
    amount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  function saveFormData({ name, amount }: { name: string; amount: number }) {
    setData({
      name,
      amount,
    });

    sessionStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify({
        name,
        amount,
      }),
    );
  }

  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Failed to parse data from sessionStorage', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (pathname === '/') {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, [pathname]);

  return (
    <AnniversaryWithdrawalContext.Provider
      value={{
        data,
        saveFormData,
        isLoading,
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
