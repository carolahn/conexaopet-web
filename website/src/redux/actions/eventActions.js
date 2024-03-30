import axios from '../../utils/axiosConfig';
import { setEventList, setLoading, setNextPage } from '../reducers/eventSlice';

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

      // Concatena os novos resultados com os existentes
      const updatedEventList = [...currentEventList, ...data.results];

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