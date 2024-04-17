import axios from '../../utils/axiosConfig';
import { setFavoriteEventList, setLoading, fetchFavoriteEventFailure, addToFavoriteEventList, removeFromFavoriteEventList } from '../reducers/favoriteEventSlice';
import { setEventList, setEventListByProtector, setSingleEvent } from '../reducers/eventSlice'; 
import { setSearchResults } from '../reducers/searchEventSlice';

export const fetchFavoriteEventList = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.get(`/favorite_events/`);
    const data = response.data;

    dispatch(setFavoriteEventList(data));
    
  } catch (error) {
    console.error('Error fetching favorite events list:', error);
    dispatch(fetchFavoriteEventFailure(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const addFavoriteEvent = (event) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.post(`/add_favorite_event/${event.id}/`);
    const responseData = response.data;

    dispatch(addToFavoriteEventList(responseData));

    // Atualiza eventList
    const { eventList } = getState().event;
    const index = eventList.findIndex(e => e.id === event.id);
    if (index !== -1) {
      const updatedEventList = [...eventList];
      updatedEventList[index] = responseData.event;
      dispatch(setEventList(updatedEventList));
    }

    // Atualiza eventListByProtector
    const ownerId = event.owner.id;
    const { eventListByProtector } = getState().event;
    if (eventListByProtector.hasOwnProperty(ownerId)) {
      const protectorEventList = [...eventListByProtector[event.owner.id]];
      const eventIndex = protectorEventList.findIndex(e => e.id === event.id);
      if (eventIndex !== -1) {
        protectorEventList[eventIndex] = responseData.event;
        dispatch(setEventListByProtector({ protectorId: ownerId, eventList: protectorEventList }));
      }
    }

    // Atualiza single event
    dispatch(setSingleEvent(responseData.event));

    // Atualizar resultados da busca
    const currentState = getState();
    const searchResults = currentState.searchEvents.searchResults;
    const nextPage = currentState.searchEvents.nextPage;
    const updatedSearchResults = searchResults.map(item => {
      if (item.id === event.id) {
        return responseData.event;
      }
      return item;
    });
    dispatch(setSearchResults({ results: updatedSearchResults, next: nextPage }));

  } catch (error) {
    console.error('Error adding favorite event:', error);
    dispatch(fetchFavoriteEventFailure(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeFavoriteEvent = (event) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.post(`/remove_favorite_event/${event.id}/`);
    const responseData = response.data;

    dispatch(removeFromFavoriteEventList(responseData));

    // Atualiza eventList
    const { eventList } = getState().event;
    const index = eventList.findIndex(e => e.id === event.id);
    if (index !== -1) {
      const updatedEventList = [...eventList];
      updatedEventList[index] = responseData.event;
      dispatch(setEventList(updatedEventList));
    }

    // Atualiza eventListByProtector
    const ownerId = event.owner.id;
    const { eventListByProtector } = getState().event;
    if (eventListByProtector.hasOwnProperty(ownerId)) {
      const protectorEventList = [...eventListByProtector[event.owner.id]];
      const eventIndex = protectorEventList.findIndex(e => e.id === event.id);
      if (eventIndex !== -1) {
        protectorEventList[eventIndex] = responseData.event;
        dispatch(setEventListByProtector({ protectorId: ownerId, eventList: protectorEventList }));
      }
    }

    // Atualiza single event
    dispatch(setSingleEvent(responseData.event));

    // Atualizar resultados da busca
    const currentState = getState();
    const searchResults = currentState.searchEvents.searchResults;
    const nextPage = currentState.searchEvents.nextPage;
    const updatedSearchResults = searchResults.map(item => {
      if (item.id === event.id) {
        return responseData.event;
      }
      return item;
    });
    dispatch(setSearchResults({ results: updatedSearchResults, next: nextPage }));

  } catch (error) {
    console.error('Error removing favorite event:', error);
    dispatch(fetchFavoriteEventFailure(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};