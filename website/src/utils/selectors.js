import { createSelector } from 'reselect';

const selectTokenFromState = state => state.authReducer.token;
const selectUserFromState = state => state.authReducer.user;

const selectTokenFromLocalStorage = () => localStorage.getItem('token');

const selectUserFromLocalStorage = () => {
  const userJSON = localStorage.getItem('user');
  return userJSON ? JSON.parse(userJSON) : null;
};

// Memoização dos seletores
export const getToken = createSelector(
  [selectTokenFromState, selectTokenFromLocalStorage],
  (tokenFromState, tokenFromLocalStorage) => tokenFromState || tokenFromLocalStorage
);

export const getUser = createSelector(
  [selectUserFromState, selectUserFromLocalStorage],
  (userFromState, userFromLocalStorage) => userFromState || userFromLocalStorage
);
