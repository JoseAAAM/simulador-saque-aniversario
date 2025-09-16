'use client';

import { FgtsProvider } from '@/contexts/fgts';
import React from 'react';

export function Provider({ children }: { children: React.ReactNode }) {
  return <FgtsProvider>{children}</FgtsProvider>;
}
