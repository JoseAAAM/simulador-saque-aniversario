import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormField } from './';

describe('FormField component', () => {
  it('should render the component correctly', () => {
    render(
      <FormField label="Nome">
        <input value="José" data-testid="name-input" />
      </FormField>,
    );

    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByTestId('name-input')).toHaveValue('José');
  });

  it('should render the errors correctly', () => {
    render(
      <FormField label="Nome" error="Nome invalido">
        <input value="José" data-testid="name-input" />
      </FormField>,
    );

    expect(screen.getByText('Nome invalido')).toBeInTheDocument();
  });
});
