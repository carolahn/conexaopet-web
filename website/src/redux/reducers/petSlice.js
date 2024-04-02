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
    createPetFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setPetList, setLoading, setNextPage, setPetListByProtector, createPetFailure } = petSlice.actions;

export default petSlice.reducer;