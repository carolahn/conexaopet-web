import axios from '../../utils/axiosConfig';
import { setPetList, setLoading, setNextPage, setPetListByProtector, createPetFailure, updatePetSuccess, updatePetFailure, deletePetFailure } from '../reducers/petSlice';

export const fetchPetList = (page = 1) => async (dispatch, getState) => {
  try {
    const currentState = getState();
    const nextPage = currentState.pet.nextPage;

    // Verifica se a próxima página é diferente da atual
    if (nextPage !== page) {
      dispatch(setLoading(true));

      const response = await axios.get(`/pets/all/?page=${page}`);
      const data = response.data;
      const currentPetList = currentState.pet.petList;

      // Concatena os novos resultados com os existentes
      const updatedPetList = [...currentPetList, ...data.results];

      dispatch(setPetList(updatedPetList));
      dispatch(setNextPage(data.next));
    }
  } catch (error) {
    console.error('Error fetching pet list:', error);
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchPetListByProtector = (protectorId, page = 1) => async (dispatch, getState) => {
  try {
    const currentState = getState();
    const nextPage = currentState.pet.nextPage;

    // Verifica se a próxima página é diferente da atual
    if (nextPage !== page) {
      dispatch(setLoading(true));

      const response = await axios.get(`/pets/protector/${protectorId}/?page=${page}`);
      const data = response.data;

      // Concatena os novos resultados com os existentes
      const currentPetList = currentState.pet.petListByProtector?.[protectorId] ?? [];
      const updatedPetList = [...currentPetList, ...data.results];

      dispatch(setPetListByProtector({ protectorId, petList: updatedPetList }));
      dispatch(setNextPage(data.next));
    }
  } catch (error) {
    console.error('Error fetching pet list:', error);
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const createPet = (protectorId, petData) => async (dispatch, getState) => {
  try {
    const currentState = getState();

    const response = await axios.post('/pets/', petData);
    const createdPet = response.data;

    const currentPetList = currentState.pet.petListByProtector?.[protectorId] ?? [];
    const updatedPetList = [createdPet, ...currentPetList];

    dispatch(setPetListByProtector({ protectorId, petList: updatedPetList }));
  } catch (error) {
    console.error('Error creating pet:', error);
    dispatch(createPetFailure(error.message));
    throw error;
  }
};

export const updatePet = (petId, petData) => async (dispatch) => {
  try {
    const response = await axios.put(`/pets/update/${petId}/`, petData);
    dispatch(updatePetSuccess(response.data));
  } catch (error) {
    console.error('Error updating pet:', error);
    dispatch(updatePetFailure(error.message));
    throw error;
  }
};

export const deletePet = (petId) => async (dispatch, getState) => {
  try {
    await axios.delete(`/pets/delete/${petId}/`);

    // Remover o pet da lista petList
    const { petList } = getState().pet;
    const updatedPetList = petList.filter(pet => pet.id !== petId);
    dispatch(setPetList(updatedPetList));

    // Remover o pet da lista petListByProtector se existir
    const protectorId = getState().authReducer.user.id; // ou qualquer outra forma de obter o ID do protetor
    const petListByProtector = getState().pet.petListByProtector[protectorId];
    if (petListByProtector) {
      const updatedPetListByProtector = petListByProtector.filter(pet => pet.id !== petId);
      dispatch(setPetListByProtector({ protectorId, petList: updatedPetListByProtector }));
    }
  } catch (error) {
    console.error('Error deleting pet:', error);
    dispatch(deletePetFailure(error.message));
    throw error;
  }
};