import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:5000/api';

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post('/token/', { username, password });
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
};

