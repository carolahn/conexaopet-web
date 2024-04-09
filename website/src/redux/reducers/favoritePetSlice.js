// import { createSlice } from '@reduxjs/toolkit';

// const favoritePetSlice = createSlice({
//   name: 'favoritePet',
//   initialState: {
//     favoritePetList: [],
//     isLoading: false,
//     nextPage: null,
//     error: null,
//   },
//   reducers: {
//     setFavoritePetList(state, action) {
//       state.favoritePetList = action.payload;
//     },
//     setLoading(state, action) {
//       state.isLoading = action.payload;
//     },
//     setNextPage(state, action) {
//       state.nextPage = action.payload;
//     },
//     fetchFavoritePetFailure(state, action) {
//       state.error = action.payload;
//     },
//     resetFavoritePetState(state) {
//       return {
//         favoritePetList: [],
//         isLoading: false,
//         nextPage: null,
//         error: null,
//       };
//     },
//   },
// });

// export const { setFavoritePetList, setLoading, setNextPage, fetchFavoritePetFailure, resetFavoritePetState } = favoritePetSlice.actions;

// export default favoritePetSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const favoritePetSlice = createSlice({
  name: 'favoritePet',
  initialState: {
    favoritePetList: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setFavoritePetList(state, action) {
      state.favoritePetList = action.payload;
      state.error = null;
    },
    addToFavoritePetList(state, action) {
      const newPet = action.payload.pet;
      const updatedList = [newPet, ...state.favoritePetList];
      state.favoritePetList = updatedList;
      state.error = null;
    },
    removeFromFavoritePetList(state, action) {
      const removedPetId = action.payload.pet.id;
      const updatedList = state.favoritePetList.filter(pet => pet.id !== removedPetId);
      state.favoritePetList = updatedList;
      state.error = null;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    fetchFavoritePetFailure(state, action) {
      state.error = action.payload;
    },
    resetFavoritePetState(state) {
      return {
        favoritePetList: [],
        isLoading: false,
        error: null,
      };
    },
  },
});

export const { setFavoritePetList, addToFavoritePetList, removeFromFavoritePetList, setLoading, fetchFavoritePetFailure, resetFavoritePetState } = favoritePetSlice.actions;

export default favoritePetSlice.reducer;
