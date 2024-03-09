import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import ProfileProtector from './ProfileProtector';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/store'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: '/protector/:id', state: null, basename: '' }),
}));

const renderProtectorProfile = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ProfileProtector />
      </BrowserRouter>
    </Provider>
  );
};

// Mock do useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }), // Aqui você pode ajustar o ID conforme necessário
}));

test('renderiza ProfileProtector com a aba de animais selecionada', () => {
  renderProtectorProfile();

  // Verifica se o componente foi renderizado corretamente
  expect(screen.getByText('protetorpaulo')).toBeInTheDocument();
  expect(screen.getByText(/Cuido de mais de 300 animais/i)).toBeInTheDocument();

  // Verifica a ausência de cards de eventos
  expect(screen.queryByText('Feira de Adoção')).toBeNull();
});