import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosConfig';
import { setLoading, setSearchResults, setError, setCurrentPage, resetSearchPetsState, setSearchParams } from '../reducers/searchPetSlice';

export const searchPets = createAsyncThunk(
  'pet/searchPets',
  async (searchParams, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true)); // Ativar o indicador de carregamento
      
      const currentState = getState();
      const nextPage = currentState.searchPets.nextPage;
      const currentSearchParams = currentState.searchPets.searchParams;

      const currentPage = currentState.searchPets.currentPage;
      const nextPageNumber = nextPage ? extractPageNumberFromUrl(nextPage) : null;

      console.log("JSON.stringify(searchParams): ", JSON.stringify(searchParams))
      console.log("JSON.stringify(currentSearchParams): ", JSON.stringify(currentSearchParams))
      // Verifica se os parâmetros de busca são diferentes dos parâmetros da última busca
      if (JSON.stringify(searchParams) !== JSON.stringify(currentSearchParams)) {
        dispatch(resetSearchPetsState());

        const response = await axios.get('/pets/search/', {
          params: { ...searchParams, page: 1 }
        });

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
      // else if ((!nextPageNumber && currentPage === 0 || bolReset)) {
      //   const response = await axios.get('/pets/search/', {
      //     params: { ...searchParams, page: 1 }
      //   });

      //   dispatch(setSearchResults({
      //     results: response.data.results,
      //     next: response.data.next 
      //   }));
      
      //   dispatch(setCurrentPage(1)); 
      //   dispatch(setSearchParams(searchParams));
      // }

      dispatch(setLoading(false)); 

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


// export const searchPets = createAsyncThunk(
//   'pet/searchPets',
//   async (searchParams, { dispatch, getState }) => {
//     try {
//       dispatch(setLoading(true)); // Ativar o indicador de carregamento
      
//       const currentState = getState();
//       const existingResults = currentState.searchPets.searchResults;
//       const currentPage = currentState.searchPets.currentPage;

//       const response = await axios.get('/pets/search/', {
//         params: { ...searchParams, page: currentPage } // Adicionar o parâmetro da página à solicitação
//       });

//       // Filtrar novos resultados para evitar duplicatas
//       const newResults = response.data.results.filter(result => !existingResults.some(pet => pet.id === result.id));

//       // Concatenar novos resultados com os existentes
//       const updatedResults = [...existingResults, ...newResults];

//       dispatch(setSearchResults({
//         results: updatedResults,
//         next: response.data.next // Manter o valor de próxima página do resultado da busca
//       }));

//       dispatch(setCurrentPage(currentPage + 1)); // Incrementar a página atual
//       dispatch(setLoading(false)); // Desativar o indicador de carregamento

//     } catch (error) {
//       console.error('Error searching pets:', error);
//       dispatch(setError(error.message)); // Definir o erro
//       dispatch(setLoading(false)); // Desativar o indicador de carregamento
//       throw error;
//     }
//   }
// );

