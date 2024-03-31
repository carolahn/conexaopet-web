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

export const clearUserError = () => ({
  type: 'CLEAR_USER_ERROR',
});