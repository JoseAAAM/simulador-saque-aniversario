import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormIntro } from './';

jest.mock('@/contexts/fgts');

const mockedUseFgts = jest.mocked(useFgts);

import { useFgts } from '@/contexts/fgts';

describe('FormIntro component', () => {
  beforeEach(() => {
    mockedUseFgts.mockReset();
  });

  it('should render the name correctly', () => {
    (useFgts as jest.Mock).mockReturnValue({ data: { name: 'Guilherme' } });

    render(<FormIntro />);

    expect(screen.getByText('Olá, Guilherme!')).toBeInTheDocument();
  });
});
