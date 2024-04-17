import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosConfig';
import { setLoading, setSearchResults, setError, setCurrentPage, resetSearchPetsState, setSearchParams } from '../reducers/searchPetSlice';

export const searchPets = createAsyncThunk(
  'pet/searchPets',
  async (searchParams, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      
      const currentState = getState();
      const nextPage = currentState.searchPets.nextPage;
      const currentSearchParams = currentState.searchPets.searchParams;

      const currentPage = currentState.searchPets.currentPage;
      const nextPageNumber = nextPage ? extractPageNumberFromUrl(nextPage) : null;

      let searchResults = [];

      // Verifica se os parâmetros de busca são diferentes dos parâmetros da última busca
      if (JSON.stringify(searchParams) !== JSON.stringify(currentSearchParams)) {
        dispatch(resetSearchPetsState());

        const response = await axios.get('/pets/search/', {
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
      // Verifica se a próxima página é diferente da atual
        const response = await axios.get('/pets/search/', {
          params: { ...searchParams, page: nextPageNumber }
        });

        searchResults = response.data.results;

        // Filtrar novos resultados para evitar duplicatas
        const newResults = response.data.results.filter(result => !currentState.searchPets.searchResults.some(pet => pet.id === result.id));

        const updatedResults = [...currentState.searchPets.searchResults, ...newResults];

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
      console.error('Error searching pets:', error);
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
