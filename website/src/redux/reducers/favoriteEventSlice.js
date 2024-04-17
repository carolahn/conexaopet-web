// import { createSlice } from '@reduxjs/toolkit';

// const favoriteEventSlice = createSlice({
//   name: 'favoriteEvent',
//   initialState: {
//     favoriteEventList: [],
//     isLoading: false,
//     nextPage: null,
//     error: null,
//   },
//   reducers: {
//     setFavoriteEventList(state, action) {
//       state.favoriteEventList = action.payload;
//     },
//     setLoading(state, action) {
//       state.isLoading = action.payload;
//     },
//     setNextPage(state, action) {
//       state.nextPage = action.payload;
//     },
//     fetchFavoriteEventFailure(state, action) {
//       state.error = action.payload;
//     },
//     resetFavoriteEventState(state) {
//       return {
//         favoriteEventList: [],
//         isLoading: false,
//         nextPage: null,
//         error: null,
//       };
//     },
//   },
// });

// export const { setFavoriteEventList, setLoading, setNextPage, fetchFavoriteEventFailure, resetFavoriteEventState } = favoriteEventSlice.actions;

// export default favoriteEventSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const favoriteEventSlice = createSlice({
  name: 'favoriteEvent',
  initialState: {
    favoriteEventList: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setFavoriteEventList(state, action) {
      state.favoriteEventList = action.payload;
      state.error = null;
    },
    addToFavoriteEventList(state, action) {
      const newEvent = action.payload.event;
      const updatedList = [newEvent, ...state.favoriteEventList];
      state.favoriteEventList = updatedList;
      state.error = null;
    },
    removeFromFavoriteEventList(state, action) {
      const removedEventId = action.payload.event.id;
      const updatedList = state.favoriteEventList.filter(event => event.id !== removedEventId);
      state.favoriteEventList = updatedList;
      state.error = null;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    fetchFavoriteEventFailure(state, action) {
      state.error = action.payload;
    },
    resetFavoriteEventState(state) {
      return {
        favoriteEventList: [],
        isLoading: false,
        error: null,
      };
    },
  },
});

export const { setFavoriteEventList, addToFavoriteEventList, removeFromFavoriteEventList, setLoading, fetchFavoriteEventFailure, resetFavoriteEventState } = favoriteEventSlice.actions;

export default favoriteEventSlice.reducer;
