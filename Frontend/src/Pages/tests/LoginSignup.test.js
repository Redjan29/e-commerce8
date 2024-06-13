// frontend/src/Pages/__tests__/LoginSignup.test.js    test fonctionelle d'intégration
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginSignup from '../LoginSignup';

describe('LoginSignup Component', () => {
  it('handles form submission correctly', async () => {
    const utils = render(<LoginSignup />);
    const nomInput = utils.getByPlaceholderText('Nom');
    const prenomInput = utils.getByPlaceholderText('Prenom');
    const emailInput = utils.getByPlaceholderText('Email');
    const passwordInput = utils.getByPlaceholderText('Mot de passe');
    const submitButton = utils.getByText('Continue');

    // Simulate user input
    fireEvent.change(nomInput, { target: { value: 'John' } });
    fireEvent.change(prenomInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password1234' } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // We should see success message if everything is correct
    await waitFor(() => {
      expect(utils.getByText('Inscription avec succès')).toBeInTheDocument();
    });
  });
});
