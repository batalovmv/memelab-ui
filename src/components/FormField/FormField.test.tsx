import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FormField } from './FormField';

describe('FormField', () => {
  it('renders label and associates it with child input', () => {
    render(
      <FormField label="Email" id="email-field">
        <input />
      </FormField>,
    );

    expect(screen.getByText('Email')).toHaveAttribute('for', 'email-field');
    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email-field');
  });

  it('renders error message and marks child as invalid', () => {
    render(
      <FormField label="Name" id="name-field" error="Name is required">
        <input />
      </FormField>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Name is required');
    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-describedby', 'name-field-error');
  });

  it('renders helper text when provided', () => {
    render(
      <FormField label="Username" id="username-field" helperText="Use 3-16 characters">
        <input />
      </FormField>,
    );

    expect(screen.getByText('Use 3-16 characters')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toHaveAttribute('aria-describedby', 'username-field-helper');
  });
});
