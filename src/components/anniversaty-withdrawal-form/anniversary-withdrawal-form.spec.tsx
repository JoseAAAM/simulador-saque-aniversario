import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AnniversaryWithdrawalForm } from '.';

jest.mock('@/contexts/anniversary-withdrawal', () => ({
  useAnniversaryWithdrawal: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/utils/calculate-withdrawal', () => ({
  calculateWithdrawal: jest.fn(),
}));

import { useAnniversaryWithdrawal } from '@/contexts/anniversary-withdrawal';
import { useRouter } from 'next/navigation';
import { calculateWithdrawal } from '@/utils/calculate-withdrawal';

describe('AnniversaryWithdrawalForm component', () => {
  const mockedSaveFormData = jest.fn();
  const mockedPush = jest.fn();

  beforeEach(() => {
    (useAnniversaryWithdrawal as jest.Mock).mockReturnValue({
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
    render(<AnniversaryWithdrawalForm />);

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
    render(<AnniversaryWithdrawalForm />);

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

  it('should show error when name is empty', async () => {
    render(<AnniversaryWithdrawalForm />);

    fireEvent.change(screen.getByTestId('name'), { target: { value: '' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    expect(await screen.findByText('O nome é obrigatório')).toBeInTheDocument();
  });

  it('should show error when name is too long', async () => {
    render(<AnniversaryWithdrawalForm />);

    fireEvent.change(screen.getByTestId('name'), {
      target: { value: 'a'.repeat(101) },
    });
    fireEvent.click(screen.getByTestId('submit-button'));

    expect(await screen.findByText('O nome é muito longo')).toBeInTheDocument();
  });

  it('should show error when phone has less than 10 digits', async () => {
    render(<AnniversaryWithdrawalForm />);

    fireEvent.change(screen.getByTestId('phone'), {
      target: { value: '12345' },
    });
    fireEvent.click(screen.getByTestId('submit-button'));

    expect(
      await screen.findByText('O telefone deve conter 11 dígitos'),
    ).toBeInTheDocument();
  });

  it('should show error when phone API returns invalid', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ valid: false }),
    });

    render(<AnniversaryWithdrawalForm />);

    fireEvent.change(screen.getByTestId('phone'), {
      target: { value: '(41) 99999-8888' },
    });
    fireEvent.click(screen.getByTestId('submit-button'));

    expect(await screen.findByText('Telefone inválido')).toBeInTheDocument();
  });

  it('should show error when balance is empty', async () => {
    render(<AnniversaryWithdrawalForm />);

    fireEvent.change(screen.getByTestId('balance'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByTestId('submit-button'));

    expect(
      await screen.findByText('O saldo é obrigatório'),
    ).toBeInTheDocument();
  });

  it('should show error when date is invalid', async () => {
    render(<AnniversaryWithdrawalForm />);

    fireEvent.change(screen.getByTestId('date'), {
      target: { value: 'Invalid' },
    });
    fireEvent.click(screen.getByTestId('submit-button'));

    expect(await screen.findByText('Mês inválido')).toBeInTheDocument();
  });
});
