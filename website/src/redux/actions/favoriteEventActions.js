// import axios from '../../utils/axiosConfig';
// import { setFavoriteEventList, setLoading, setNextPage, fetchFavoriteEventFailure } from '../reducers/favoriteEventSlice';

// export const fetchFavoriteEventList = (page = 1) => async (dispatch, getState) => {
//   try {
//     const currentState = getState();
//     const nextPage = currentState.favoriteEvent.nextPage;

//     // Verifica se a próxima página é diferente da atual
//     if (nextPage !== page) {
//       dispatch(setLoading(true));

//       const response = await axios.get(`/favorite_events/?page=${page}`);
//       const data = response.data;
//       const currentFavoriteEventList = currentState.favoriteEvent.favoriteEventList;

//       // Filtra os novos resultados para remover duplicatas
//       const newResults = data.results.filter(result => !currentFavoriteEventList.some(event => event.id === result.id));

//       // Concatena os novos resultados com os existentes
//       const updatedFavoriteEventList = [...currentFavoriteEventList, ...newResults];

//       dispatch(setFavoriteEventList(updatedFavoriteEventList));
//       dispatch(setNextPage(data.next));
//     }
//   } catch (error) {
//     console.error('Error fetching favorite events list:', error);
//     dispatch(fetchFavoriteEventFailure(error.message));
//     throw error;
//   } finally {
//     dispatch(setLoading(false));
//   }
// };


import axios from '../../utils/axiosConfig';
import { setFavoriteEventList, setLoading, fetchFavoriteEventFailure, addToFavoriteEventList, removeFromFavoriteEventList } from '../reducers/favoriteEventSlice';
import { setEventList, setEventListByProtector } from '../reducers/eventSlice'; 

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

  } catch (error) {
    console.error('Error removing favorite event:', error);
    dispatch(fetchFavoriteEventFailure(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};