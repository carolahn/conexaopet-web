import React from "react";
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from "@testing-library/react";
import Home from './Home';
import store from '../redux/store'
import { Provider } from "react-redux";

const renderHome = () => {
  render(
    <Provider store={store}>
      <Home/>
    </Provider>
  );
};

test('Home Test', () => {
  renderHome();
  expect(screen.getByTestId('home-page')).toBeInTheDocument();

  const linkElement = screen.getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});