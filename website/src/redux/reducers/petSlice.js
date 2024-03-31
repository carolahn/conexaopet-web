import { createSlice } from '@reduxjs/toolkit';

const petSlice = createSlice({
  name: 'pet',
  initialState: {
    petList: [],
    petListByProtector: {},
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
    setPetListByProtector(state, action) {
      const { protectorId, petList } = action.payload;
      state.petListByProtector[protectorId] = petList;
    },
  },
});

export const { setPetList, setLoading, setNextPage, setPetListByProtector } = petSlice.actions;

export default petSlice.reducer;