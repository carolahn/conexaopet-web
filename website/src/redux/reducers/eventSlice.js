import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    eventList: [],
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
  },
});

export const { setEventList, setLoading, setNextPage } = eventSlice.actions;

export default eventSlice.reducer;