import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Desenvolva testes para atingir 60% de cobertura total da aplicação', () => {
  const emailInput = 'email-input';
  const passwordInput = 'password-input';

  it('Verifica se a tela de login é renderizada', () => {
    renderWithRouterAndRedux(<App />);
    const loginField = screen.getByTestId(emailInput);
    const passwordField = screen.getByTestId(passwordInput);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    expect(loginField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('Verifica se o botão de login ativa corretamente.', () => {
    renderWithRouterAndRedux(<App />);
    const loginField = screen.getByTestId(emailInput);
    const passwordField = screen.getByTestId(passwordInput);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(loginField, 'user');
    userEvent.type(passwordField, '123456');
    expect(loginButton).toHaveAttribute('disabled');
    userEvent.type(loginField, 'user');
    userEvent.type(passwordField, '123456');
    expect(loginButton).toHaveAttribute('disabled');
    userEvent.type(loginField, 'user@user.com');
    userEvent.type(passwordField, '123456');
    expect(loginButton).not.toHaveAttribute('disabled');
  });

  it('Verifica o login e a página de conversão.', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const loginField = screen.getByTestId(emailInput);
    const passwordField = screen.getByTestId(passwordInput);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    const email = 'user@user.com';

    userEvent.type(loginField, email);
    userEvent.type(passwordField, '123456');
    expect(loginButton).not.toHaveAttribute('disabled');
    userEvent.click(loginButton);
    expect(history.location.pathname).toBe('/carteira');
    const emailField = screen.getByTestId('email-field');
    expect(emailField.textContent).toBe(email);

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const addExpenses = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(value, '15');
    userEvent.type(description, 'Amiibo');
    userEvent.click(addExpenses);

    const headerTotal = screen.getByTestId('total-field');
    await waitFor(() => expect(headerTotal.innerHTML).toBe('77.29'));
  });
});
