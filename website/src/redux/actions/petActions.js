import axios from '../../utils/axiosConfig';
import { setPetList, setLoading, setNextPage, setPetListByProtector, createPetFailure } from '../reducers/petSlice';

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
    dispatch(fetchPetList()); // Atualiza a lista de pets após a atualização bem-sucedida
  } catch (error) {
    console.error('Error updating pet:', error);
    throw error;
  }
};