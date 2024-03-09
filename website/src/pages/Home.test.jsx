import React from "react";
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from "@testing-library/react";
import Home from './Home';
import store from '../redux/store'
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: '/', state: null, basename: '' }),
}));

const renderHome = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  );
};

test('Home Test', () => {
  renderHome();
  // console.log(screen.debug());
  expect(screen.getByTestId('home-page')).toBeInTheDocument();

});