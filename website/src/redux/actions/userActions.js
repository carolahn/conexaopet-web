import axios from '../../utils/axiosConfig';

export const createUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('/users/register/', userData);
    dispatch({ type: 'CREATE_USER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'CREATE_USER_FAILURE', payload: error.response.data });
  }
};

export const updateUser = (userId, userData) => async (dispatch) => {
  try {
    const response = await axios.put(`/users/update/${userId}/`, userData);
    dispatch({ type: 'UPDATE_USER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'UPDATE_USER_FAILURE', payload: error.response.data });
  }
};

export const fetchProtectorUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('/users/protector/');
    dispatch({ type: 'FETCH_PROTECTOR_USERS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_PROTECTOR_USERS_FAILURE', payload: error.response.data });
  }
};

export const clearUserError = () => ({
  type: 'CLEAR_USER_ERROR',
});

export const getUser = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/users/${userId}/`);
    dispatch({ type: 'GET_USER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'GET_USER_FAILURE', payload: error.response.data });
  }
};

export const fetchProfileUser = (userId) => async (dispatch) => {
  dispatch({ type: 'FETCH_USER_REQUEST' });
  try {
    const response = await axios.get(`/users/${userId}/`);
    dispatch({ type: 'FETCH_USER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_USER_FAILURE', payload: error.response.data });
  }
};