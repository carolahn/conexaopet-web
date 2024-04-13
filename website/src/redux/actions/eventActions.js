import axios from '../../utils/axiosConfig';
import { setEventList, setLoading, setNextPage, setEventListByProtector, createEventFailure, updateEventSuccess, updateEventFailure, deleteEventFailure, setCurrentEventId, setSingleEvent } from '../reducers/eventSlice';
import { setSearchResults as setSearchEventResults } from '../reducers/searchEventSlice';

export const fetchEventList = (page = 1) => async (dispatch, getState) => {
  try {
    const currentState = getState();
    const nextPage = currentState.event.nextPage;

    // Verifica se a próxima página é diferente da atual
    if (nextPage !== page) {
      dispatch(setLoading(true));

      const response = await axios.get(`/events/all/?page=${page}`);
      const data = response.data;
      const currentEventList = currentState.event.eventList;

      // Filtra os novos resultados para remover duplicatas
      const newResults = data.results.filter(result => !currentEventList.some(event => event.id === result.id));

      // Concatena os novos resultados com os existentes
      const updatedEventList = [...currentEventList, ...newResults];

      dispatch(setEventList(updatedEventList));
      dispatch(setNextPage(data.next));
    }
  } catch (error) {
    console.error('Error fetching event list:', error);
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchEventListByProtector = (protectorId, page = 1) => async (dispatch, getState) => {
  try {
    const currentState = getState();
    const nextPage = currentState.event.nextPage;

    // Verifica se a próxima página é diferente da atual
    if (nextPage !== page) {
      dispatch(setLoading(true));

      const response = await axios.get(`/events/protector/${protectorId}/?page=${page}`);
      const data = response.data;
      const currentEventList = currentState.event.eventListByProtector?.[protectorId] ?? [];
      
      // Filtra os novos resultados para remover duplicatas
      const newResults = data.results.filter(result => !currentEventList.some(event => event.id === result.id));

      // Concatena os novos resultados com os existentes
      const updatedEventList = [...currentEventList, ...newResults];

      dispatch(setEventListByProtector({ protectorId, eventList: updatedEventList }));
      dispatch(setNextPage(data.next));
    }
  } catch (error) {
    console.error('Error fetching event list:', error);
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const createEvent = (protectorId, eventData) => async (dispatch, getState) => {
  try {
    const currentState = getState();

    const response = await axios.post('/events/', eventData);
    const createdEvent = response.data;

    const currentEventListByProtector = currentState.event.eventListByProtector?.[protectorId] ?? [];
    const updatedEventListByProtector = [createdEvent, ...currentEventListByProtector];
    dispatch(setEventListByProtector({ protectorId, eventList: updatedEventListByProtector }));

    const currentEventList = currentState.event.eventList;
    const updatedEventList = [createdEvent, ...currentEventList];
    dispatch(setEventList(updatedEventList));

  } catch (error) {
    console.error('Error creating event:', error);
    dispatch(createEventFailure(error.message));
    throw error;
  } 
};

export const updateEvent = (eventId, eventData) => async (dispatch, getState) => {
  try {
    const response = await axios.put(`/events/update/${eventId}/`, eventData);
    dispatch(updateEventSuccess(response.data));

    // Atualizar resultados da busca
    const currentState = getState();
    const searchResults = currentState.searchEvents.searchResults;
    const nextPage = currentState.searchEvents.nextPage;
    const updatedSearchResults = searchResults.map(item => {
      if (item.id === eventId) {
        return response.data;
      }
      return item;
    });
    dispatch(setSearchEventResults({ results: updatedSearchResults, next: nextPage }))

  } catch (error) {
    console.error('Error updating event:', error);
    dispatch(updateEventFailure(error.message));
    throw error;
  }
};

export const deleteEvent = (eventId) => async (dispatch, getState) => {
  try {
    await axios.delete(`/events/delete/${eventId}/`);

    const { eventList } = getState().event;
    const updatedEventList = eventList.filter(event => event.id !== eventId);
    dispatch(setEventList(updatedEventList));

    const protectorId = getState().authReducer.user.id; 
    const eventListByProtector = getState().event.eventListByProtector[protectorId];
    if (eventListByProtector) {
      const updatedEventListByProtector = eventListByProtector.filter(event => event.id !== eventId);
      dispatch(setEventListByProtector({ protectorId, eventList: updatedEventListByProtector }));
    }

    // Atualizar resultados da busca
    const currentState = getState();
    const searchResults = currentState.searchEvents.searchResults;
    const nextPage = currentState.searchEvents.nextPage;
    const updatedSearchResults = searchResults.filter(event => event.id !== eventId);
    dispatch(setSearchEventResults({ results: updatedSearchResults, next: nextPage }))

  } catch (error) {
    console.error('Error deleting event:', error);
    dispatch(deleteEventFailure(error.message));
    throw error;
  }
};

export const fetchSingleEvent = (eventId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.get(`/events/${eventId}/`);
    const singleEvent = response.data;

    dispatch(setSingleEvent(singleEvent));
    dispatch(setCurrentEventId(eventId));
    return singleEvent;
  } catch (error) {
    console.error('Error fetching single event:', error);
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const confirmEvent = (eventId, isConfirmed) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.put(`/events/update/is_confirmed/${eventId}/`, { is_confirmed: isConfirmed });
    const updatedEvent = response.data;
    dispatch(updateEventSuccess(updatedEvent));

    // Atualizar resultados da busca
    const currentState = getState();
    const searchResults = currentState.searchEvents.searchResults;
    const nextPage = currentState.searchEvents.nextPage;
    const updatedSearchResults = searchResults.map(event => {
      if (event.id === updatedEvent.id) {
        return updatedEvent;
      }
      return event;
    });
    dispatch(setSearchEventResults({ results: updatedSearchResults, next: nextPage }));

  } catch (error) {
    console.error('Error confirming event:', error);
    dispatch(updateEventFailure(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};