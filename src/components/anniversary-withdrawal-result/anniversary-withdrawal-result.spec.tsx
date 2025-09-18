import React from 'react';
import { render, screen } from '@testing-library/react';
import { AnniversaryWithdrawalResult } from '.';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));
jest.mock('@/contexts/anniversary-withdrawal');

const mockedUseAnniversaryWithdrawal = jest.mocked(useAnniversaryWithdrawal);

import { useAnniversaryWithdrawal } from '@/contexts/anniversary-withdrawal';
import { redirect } from 'next/navigation';

describe('AnniversaryWithdrawalResult component', () => {
  beforeEach(() => {
    mockedUseAnniversaryWithdrawal.mockReset();
  });

  it('should render the withdrawal amount correctly', () => {
    (useAnniversaryWithdrawal as jest.Mock).mockReturnValue({
      data: { amount: 123.45 },
    });

    render(<AnniversaryWithdrawalResult />);

    expect(screen.getByText('R$')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText(',45')).toBeInTheDocument();
  });

  it('should render the withdrawal amount without breaking the cents', () => {
    (useAnniversaryWithdrawal as jest.Mock).mockReturnValue({
      data: { amount: 123.4 },
    });

    render(<AnniversaryWithdrawalResult />);

    expect(screen.getByText('R$')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText(',40')).toBeInTheDocument();
  });

  it('should redirect to homepage if data is empty', () => {
    (useAnniversaryWithdrawal as jest.Mock).mockReturnValue({
      data: { amount: 0, name: '' },
    });

    render(<AnniversaryWithdrawalResult />);

    expect(redirect).toHaveBeenCalled();
  });
});
