import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageTitle } from '.';

jest.mock('@/contexts/anniversary-withdrawal');

const mockedUseWithdrawalContext = jest.mocked(useAnniversaryWithdrawal);

import { useAnniversaryWithdrawal } from '@/contexts/anniversary-withdrawal';

describe('PageTitle component', () => {
  beforeEach(() => {
    mockedUseWithdrawalContext.mockReset();
  });

  it('should render the name correctly', () => {
    (useAnniversaryWithdrawal as jest.Mock).mockReturnValue({
      data: { name: 'Guilherme' },
    });

    render(<PageTitle />);

    expect(screen.getByText('Olá, Guilherme!')).toBeInTheDocument();
  });
});
