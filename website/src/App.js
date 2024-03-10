import React from 'react';
import { Provider } from 'react-redux';
import AppRoutes from '../src/routes';
import store from '../src/redux/store';
import './index.css'; 

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <AppRoutes />
      </div>
    </Provider>
  );
};

export default App;