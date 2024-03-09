import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from './RegisterForm';


test('updates state on input change', () => {
  render(<RegisterForm />);
  
  fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Novo Nome' } });
  expect(screen.getByLabelText('Nome')).toHaveValue('Novo Nome');
});


test('shows Toast on form submission', () => {
  render(<RegisterForm />);
  
  // Simule o envio do formulário
  fireEvent.submit(screen.getByText('Cadastrar'));

  // Adicione verificações específicas para garantir que o Toast seja exibido
  expect(screen.getByText('Cadastro realizado')).toBeInTheDocument();
});