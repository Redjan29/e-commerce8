// frontend/src/Pages/__tests__/LoginSignup.test.js    test fonctionelle d'intégration
// Tests fonctionelles 

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import LoginSignup from '../LoginSignup';

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.log.mockRestore();
  console.error.mockRestore();
});

test('renders the login/signup form', () => {
  render(<LoginSignup />);
  expect(screen.getByPlaceholderText('Nom')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Prenom')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Mot de passe')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
});

test('logs success message on successful registration', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ message: "Inscription avec succès" }), { status: 201 });
  render(<LoginSignup />);
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Mot de passe'), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /continue/i }));

  await waitFor(() => {
    expect(console.log).toHaveBeenCalledWith('Success:', { message: 'Inscription avec succès' });
  });
});

test('logs error message on fetch failure', async () => {
  fetchMock.mockReject(new Error('Failed to connect'));
  render(<LoginSignup />);
  fireEvent.click(screen.getByRole('button', { name: /continue/i }));

  await waitFor(() => {
    expect(console.error).toHaveBeenCalledWith('Error:', new Error('Failed to connect'));
  });
});

test('displays error message on fetch failure', async () => {
  fetchMock.mockImplementationOnce(() => Promise.reject(new Error('Failed to connect')));
  render(<LoginSignup />);
  fireEvent.click(screen.getByRole('button', { name: /continue/i }));

  await waitFor(() => {
    expect(screen.getByText(/error: Failed to connect/i)).toBeInTheDocument();
  });
});
