// import axios from '../../utils/axiosConfig';
// import { setFavoritePetList, setLoading, setNextPage, fetchFavoritePetFailure } from '../reducers/favoritePetSlice';

// export const fetchFavoritePetList = (page = 1) => async (dispatch, getState) => {
//   try {
//     const currentState = getState();
//     const nextPage = currentState.favoritePet.nextPage;

//     // Verifica se a próxima página é diferente da atual
//     if (nextPage !== page) {
//       dispatch(setLoading(true));

//       const response = await axios.get(`/favorite_pets/?page=${page}`);
//       const data = response.data;
//       const currentFavoritePetList = currentState.favoritePet.favoritePetList;

//       // Filtra os novos resultados para remover duplicatas
//       const newResults = data.results.filter(result => !currentFavoritePetList.some(pet => pet.id === result.id));

//       // Concatena os novos resultados com os existentes
//       const updatedFavoritePetList = [...currentFavoritePetList, ...newResults];

//       dispatch(setFavoritePetList(updatedFavoritePetList));
//       dispatch(setNextPage(data.next));
//     }
//   } catch (error) {
//     console.error('Error fetching favorite pets list:', error);
//     dispatch(fetchFavoritePetFailure(error.message));
//     throw error;
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

import axios from '../../utils/axiosConfig';
import { setFavoritePetList, setLoading, fetchFavoritePetFailure, addToFavoritePetList, removeFromFavoritePetList } from '../reducers/favoritePetSlice';
import { setPetList, setPetListByProtector } from '../reducers/petSlice';


export const fetchFavoritePetList = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.get(`/favorite_pets/`);
    const data = response.data;

    dispatch(setFavoritePetList(data));

  } catch (error) {
    console.error('Error fetching favorite pets list:', error);
    dispatch(fetchFavoritePetFailure(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const addFavoritePet = (pet) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.post(`/add_favorite_pet/${pet.id}/`);
    const responseData = response.data;

    dispatch(addToFavoritePetList(responseData));

    // Atualiza petList
    const { petList } = getState().pet;
    const index = petList.findIndex(p => p.id === pet.id);
    if (index !== -1) {
      const updatedPetList = [...petList];
      updatedPetList[index] = responseData.pet;
      dispatch(setPetList(updatedPetList));
    }

    // Atualiza petListByProtector
    const ownerId = pet.owner.id;
    const { petListByProtector } = getState().pet;
    if (petListByProtector.hasOwnProperty(ownerId)) {
      const protectorPetList = [...petListByProtector[pet.owner.id]];
      const petIndex = protectorPetList.findIndex(p => p.id === pet.id);
      if (petIndex !== -1) {
        protectorPetList[petIndex] = responseData.pet;
        dispatch(setPetListByProtector({ protectorId: ownerId, petList: protectorPetList }));
      }
    }

  } catch (error) {
    console.error('Error adding favorite pet:', error);
    dispatch(fetchFavoritePetFailure(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeFavoritePet = (pet) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.post(`/remove_favorite_pet/${pet.id}/`);
    const responseData = response.data;

    dispatch(removeFromFavoritePetList(responseData));

    // Atualiza petList
    const { petList } = getState().pet;
    const index = petList.findIndex(p => p.id === pet.id);
    if (index !== -1) {
      const updatedPetList = [...petList];
      updatedPetList[index] = responseData.pet;
      dispatch(setPetList(updatedPetList));
    }

    // Atualiza petListByProtector
    const ownerId = pet.owner.id;
    const { petListByProtector } = getState().pet;
    if (petListByProtector.hasOwnProperty(ownerId)) {
      const protectorPetList = [...petListByProtector[pet.owner.id]];
      const petIndex = protectorPetList.findIndex(p => p.id === pet.id);
      if (petIndex !== -1) {
        protectorPetList[petIndex] = responseData.pet;
        dispatch(setPetListByProtector({ protectorId: ownerId, petList: protectorPetList }));
      }
    }

  } catch (error) {
    console.error('Error removing favorite pet:', error);
    dispatch(fetchFavoritePetFailure(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};