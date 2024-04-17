import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosConfig';
import { setLoading, resetSearchEventsState, setSearchResults, setCurrentPage, setSearchParams, setError } from '../reducers/searchEventSlice';

export const searchEvents = createAsyncThunk(
  'event/searchEvents',
  async (searchParams, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      
      const currentState = getState();
      const nextPage = currentState.searchEvents.nextPage;
      const currentSearchParams = currentState.searchEvents.searchParams;

      const currentPage = currentState.searchEvents.currentPage;
      const nextPageNumber = nextPage ? extractPageNumberFromUrl(nextPage) : null;

      let searchResults = [];

      if (JSON.stringify(searchParams) !== JSON.stringify(currentSearchParams)) {
        dispatch(resetSearchEventsState());

        const response = await axios.get('/events/search/', {
          params: { ...searchParams, page: 1 }
        });

        searchResults = response.data.results;

        dispatch(setSearchResults({
          results: response.data.results,
          next: response.data.next 
        }));
      
        dispatch(setCurrentPage(1)); 
        dispatch(setSearchParams(searchParams));


      } else if (nextPageNumber && nextPageNumber !== currentPage) {
        const response = await axios.get('/events/search/', {
          params: { ...searchParams, page: nextPageNumber }
        });

        searchResults = response.data.results;

        const newResults = response.data.results.filter(result => !currentState.searchEvents.searchResults.some(event => event.id === result.id));

        const updatedResults = [...currentState.searchEvents.searchResults, ...newResults];

        dispatch(setSearchResults({
          results: updatedResults,
          next: response.data.next 
        }));

        dispatch(setCurrentPage(nextPageNumber)); 
        dispatch(setSearchParams(searchParams));
      } 

      dispatch(setLoading(false)); 
      return searchResults;

    } catch (error) {
      console.error('Error searching events:', error);
      dispatch(setError(error.message)); 
      dispatch(setLoading(false)); 
      throw error;
    }
  }
);

const extractPageNumberFromUrl = (url) => {
  const matches = url.match(/page=(\d+)/);
  return matches ? parseInt(matches[1]) : null;
};
