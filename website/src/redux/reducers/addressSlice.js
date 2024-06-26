import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addressList: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setAddressList(state, action) {
      state.addressList = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    getAddressListFailure(state, action) {
      state.error = action.payload;
    },
    createAddressSuccess(state, action) {
      state.error = null;
      state.addressList.unshift(action.payload);
    },
    createAddressFailure(state, action) {
      state.error = action.payload;
    },
    resetAddressState(state) { 
      return {
        addressList: [],
        isLoading: false,
        error: null,
      };
    },
  },
});

export const { setAddressList, setLoading, getAddressListFailure, createAddressSuccess, createAddressFailure, resetAddressState } = addressSlice.actions;

export default addressSlice.reducer;
