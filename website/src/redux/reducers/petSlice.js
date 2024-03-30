import { createSlice } from '@reduxjs/toolkit';

const petSlice = createSlice({
  name: 'pet',
  initialState: {
    petList: [],
    isLoading: false,
    nextPage: null,
    error: null,
  },
  reducers: {
    setPetList(state, action) {
      if (action.payload !== undefined) {
        state.petList = action.payload;
      }
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setNextPage(state, action) {
      state.nextPage = action.payload;
    },
  },
});

export const { setPetList, setLoading, setNextPage } = petSlice.actions;

export default petSlice.reducer;