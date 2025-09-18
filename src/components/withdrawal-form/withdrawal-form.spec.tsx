import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { WithdrawalForm } from './';

jest.mock('@/contexts/fgts', () => ({
  useFgts: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/utils/calculate-withdrawal', () => ({
  calculateWithdrawal: jest.fn(),
}));

import { useFgts } from '@/contexts/fgts';
import { useRouter } from 'next/navigation';
import { calculateWithdrawal } from '@/utils/calculate-withdrawal';

describe('WithdrawalForm component', () => {
  const mockedSaveFormData = jest.fn();
  const mockedPush = jest.fn();

  beforeEach(() => {
    (useFgts as jest.Mock).mockReturnValue({
      saveFormData: mockedSaveFormData,
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: mockedPush,
    });

    (calculateWithdrawal as jest.Mock).mockReturnValue({
      withdrawalAmount: 123.45,
    });

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ valid: true }),
    });

    mockedSaveFormData.mockClear();
    mockedPush.mockClear();
    (calculateWithdrawal as jest.Mock).mockClear();
    (global.fetch as jest.Mock).mockClear();
  });

  it('should render the component correctly', () => {
    render(<WithdrawalForm />);

    expect(screen.getByText('Qual seu nome?')).toBeInTheDocument();
    expect(screen.getByText('Qual seu telefone?')).toBeInTheDocument();
    expect(screen.getByText('Qual seu saldo?')).toBeInTheDocument();
    expect(
      screen.getByText('Qual seu mês de aniversário?'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Ver Proposta' }),
    ).toBeInTheDocument();
  });

  it('should submit form and call saveFormData + router.push', async () => {
    render(<WithdrawalForm />);

    fireEvent.change(screen.getByTestId('name'), {
      target: { value: 'José Machoski' },
    });

    fireEvent.change(screen.getByTestId('phone'), {
      target: { value: '(41) 99999-8888' },
    });

    fireEvent.change(screen.getByTestId('balance'), {
      target: { value: 'R$ 1.000,00' },
    });

    fireEvent.change(screen.getByTestId('date'), {
      target: { value: 'Janeiro' },
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringMatching(/\/api\/validate-phone\//),
      );

      expect(calculateWithdrawal).toHaveBeenCalledWith({ balance: 1000 });
      expect(mockedSaveFormData).toHaveBeenCalledWith({
        name: 'José Machoski',
        amount: 123.45,
      });
      expect(mockedPush).toHaveBeenCalledWith('/resultado');
    });
  });
});
