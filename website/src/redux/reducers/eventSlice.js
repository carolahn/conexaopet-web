import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    eventList: [],
    eventListByProtector: {},
    isLoading: false,
    nextPage: null,
    error: null,
  },
  reducers: {
    setEventList(state, action) {
      if (action.payload !== undefined) {
        state.eventList = action.payload;
      }
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setNextPage(state, action) {
      state.nextPage = action.payload;
    },
    setEventListByProtector(state, action) {
      const { protectorId, eventList } = action.payload;
      state.eventListByProtector[protectorId] = eventList;
    },
  },
});

export const { setEventList, setLoading, setNextPage, setEventListByProtector } = eventSlice.actions;

export default eventSlice.reducer;