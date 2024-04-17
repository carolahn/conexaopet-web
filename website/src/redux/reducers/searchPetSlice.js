import { createSlice } from '@reduxjs/toolkit';

const searchPetsSlice = createSlice({
  name: 'searchPets',
  initialState: {
    searchResults: [],
    isLoading: false,
    error: null,
    currentPage: 0, 
    nextPage: null, 
    searchParams: {},
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload.results;
      state.nextPage = action.payload.next; 
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setCurrentPage(state, action) { 
      state.currentPage = action.payload;
    },
    resetSearchPetsState(state) {
      state.searchResults = [];
      state.isLoading = false;
      state.error = null;
      state.currentPage = 0;
      state.nextPage = null;
      state.searchParams = {};
    },
    setSearchParams(state, action) { 
      state.searchParams = action.payload;
    },
  },
});

export const { setLoading, setSearchResults, setError, clearError, setCurrentPage, resetSearchPetsState, setSearchParams } = searchPetsSlice.actions;
export default searchPetsSlice.reducer;
