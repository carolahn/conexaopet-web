import axios from '../../utils/axiosConfig';
import { setFavoritePetList, setLoading, fetchFavoritePetFailure, addToFavoritePetList, removeFromFavoritePetList } from '../reducers/favoritePetSlice';
import { setPetList, setPetListByProtector, setSinglePet } from '../reducers/petSlice';
import { setSearchResults } from '../reducers/searchPetSlice';
import { setFavoriteEventList } from '../reducers/favoriteEventSlice';


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

    // Atualiza single pet
    dispatch(setSinglePet(responseData.pet));

    // Atualizar resultados da busca
    const currentState = getState();
    const searchResults = currentState.searchPets.searchResults;
    const nextPage = currentState.searchPets.nextPage;
    const updatedSearchResults = searchResults.map(item => {
      if (item.id === pet.id) {
        return responseData.pet;
      }
      return item;
    });
    dispatch(setSearchResults({ results: updatedSearchResults, next: nextPage }));

    // Atualizar favoriteEvent
    const favoriteEvents = currentState.favoriteEvent.favoriteEventList;
    const updatedFavoriteEvents = favoriteEvents.map(event => ({
      ...event,
      pets: event.pets.map(item => (item.id === responseData.pet.id ? responseData.pet : item)),
    }));
    dispatch(setFavoriteEventList(updatedFavoriteEvents));

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

    // Atualiza single pet
    dispatch(setSinglePet(responseData.pet));

    // Atualizar resultados da busca
    const currentState = getState();
    const searchResults = currentState.searchPets.searchResults;
    const nextPage = currentState.searchPets.nextPage;
    const updatedSearchResults = searchResults.map(item => {
      if (item.id === pet.id) {
        return responseData.pet;
      }
      return item;
    });
    dispatch(setSearchResults({ results: updatedSearchResults, next: nextPage }));

    // Atualizar favoriteEvent
    const favoriteEvents = currentState.favoriteEvent.favoriteEventList;
    const updatedFavoriteEvents = favoriteEvents.map(event => ({
      ...event,
      pets: event.pets.map(item => (item.id === responseData.pet.id ? responseData.pet : item)),
    }));
    dispatch(setFavoriteEventList(updatedFavoriteEvents));

  } catch (error) {
    console.error('Error removing favorite pet:', error);
    dispatch(fetchFavoritePetFailure(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};