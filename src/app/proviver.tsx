'use client';

import { AnniversaryWithdrawalProvider } from '@/contexts/anniversary-withdrawal';
import React from 'react';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <AnniversaryWithdrawalProvider>{children}</AnniversaryWithdrawalProvider>
  );
}
