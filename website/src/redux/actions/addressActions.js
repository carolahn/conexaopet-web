import axios from '../../utils/axiosConfig';
import { setLoading, setAddressList, getAddressListFailure, createAddressSuccess, createAddressFailure } from '../reducers/addressSlice';

export const getAddressList = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.get('/addresses/all/');
    const addressList = response.data;

    dispatch(setAddressList(addressList));
  } catch (error) {
    console.error('Error fetching address list:', error);
    dispatch(getAddressListFailure(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const createAddress = (addressData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post('/addresses/', addressData);
    dispatch(createAddressSuccess(response.data));
    return response.data;
  } catch (error) {
    console.error('Error creating address:', error);
    dispatch(createAddressFailure(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};