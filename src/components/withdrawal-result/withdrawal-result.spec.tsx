// src/components/WithdrawalResult.component.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { WithdrawalResult } from './';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

jest.mock('@/contexts/fgts');

const mockedUseFgts = jest.mocked(useFgts);

import { useFgts } from '@/contexts/fgts';

describe('WithdrawalResult component', () => {
  beforeEach(() => {
    mockedUseFgts.mockReset();
  });

  it('renders the withdrawal amount correctly', () => {
    (useFgts as jest.Mock).mockReturnValue({ data: { amount: 123.45 } });

    render(<WithdrawalResult />);

    expect(screen.getByText('R$')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText(',45')).toBeInTheDocument();
  });
});
