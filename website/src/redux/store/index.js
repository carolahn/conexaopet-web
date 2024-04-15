// import { createStore, applyMiddleware } from 'redux';
// import { thunk } from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from '../reducers';

// const enhancer = composeWithDevTools(applyMiddleware(thunk));
// const store = createStore(rootReducer, enhancer);

// export default store;

//////////////////////////////////////////
// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import { thunk } from 'redux-thunk';
// import rootReducer from '../reducers';

// const persistConfig = {
//   key: 'root', // chave para armazenar os dados no armazenamento
//   storage, // armazenamento a ser usado (localStorage, sessionStorage, etc.)
//   // outros parâmetros opcionais aqui, como blacklist, whitelist, transformações, etc.
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const enhancer = composeWithDevTools(applyMiddleware(thunk));
// const store = createStore(persistedReducer, enhancer);
// const persistor = persistStore(store);

// const logout = () => {
//   return async (dispatch) => {
//     try {
//       // Limpa os dados persistidos
//       await persistor.purge();
      
//       dispatch({ type: 'LOGOUT' });
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };
// };

// export { store, persistor, logout };

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { thunk } from 'redux-thunk';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root', // chave para armazenar os dados no armazenamento
  storage, // armazenamento a ser usado (localStorage, sessionStorage, etc.)
  // outros parâmetros opcionais aqui, como blacklist, whitelist, transformações, etc.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let enhancer = applyMiddleware(thunk);

// Verifica se estamos em ambiente de desenvolvimento
if (process.env.NODE_ENV === 'development') {
  const { composeWithDevTools } = require('redux-devtools-extension');
  enhancer = composeWithDevTools(enhancer);
}

const store = createStore(persistedReducer, enhancer);
const persistor = persistStore(store);

const logout = () => {
  return async (dispatch) => {
    try {
      // Limpa os dados persistidos
      await persistor.purge();
      
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
};

export { store, persistor, logout };