import axios from '../../utils/axiosConfig';
import { setPetList, setLoading, setNextPage, setPetListByProtector, createPetFailure, updatePetSuccess, updatePetFailure, deletePetFailure, getPetChoicesSuccess, getPetChoicesFailure, setCurrentPetId, setSinglePet } from '../reducers/petSlice';

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

      // Filtra os novos resultados para remover duplicatas
      const newResults = data.results.filter(result => !currentPetList.some(pet => pet.id === result.id));

      // Concatena os novos resultados com os existentes
      const updatedPetList = [...currentPetList, ...newResults];

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

      const currentPetList = currentState.pet.petListByProtector?.[protectorId] ?? [];
      // Filtra os novos resultados para remover duplicatas
      const newResults = data.results.filter(result => !currentPetList.some(pet => pet.id === result.id));

      // Concatena os novos resultados com os existentes
      const updatedPetList = [...currentPetList, ...newResults];

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

export const getPetChoices = (protectorId) => async (dispatch) => {
  try {
    const response = await axios.get(`/pets/protector/${protectorId}/all/`);
    dispatch(getPetChoicesSuccess(response.data));
  } catch (error) {
    console.error('Error fetching pet choices:', error);
    dispatch(getPetChoicesFailure(error.message));
    throw error;
  }
};

export const fetchSinglePet = (petId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.get(`/pets/${petId}/`);
    const singlePet = response.data;

    dispatch(setSinglePet(singlePet));
    dispatch(setCurrentPetId(petId));
    return singlePet;
  } catch (error) {
    console.error('Error fetching single pet:', error);
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};