import axios from '../../utils/axiosConfig';
import { setCupomList, setLoading, setNextPage, createCupomSuccess, createCupomFailure, updateCupomSuccess, updateCupomFailure, deleteCupomSuccess, deleteCupomFailure, updateExpiredCuponsSuccess, updateExpiredCuponsFailure, setCupomListBySponsor, fetchCupomListFailure } from '../reducers/cupomSlice';

export const fetchCupomList = (page = 1) => async (dispatch, getState) => {
  try {
    const currentState = getState();
    const nextPage = currentState.cupom.nextPage;

    // Verifica se a próxima página é diferente da atual
    if (nextPage !== page) {
      dispatch(setLoading(true));

      const response = await axios.get(`/cupons/all/?page=${page}`);
      const data = response.data;
      const currentCupomList = currentState.cupom.cupomList;

      // Filtra os novos resultados para remover duplicatas
      const newResults = data.results.filter(result => !currentCupomList.some(cupom => cupom.id === result.id));

      // Concatena os novos resultados com os existentes
      const updatedCupomList = [...currentCupomList, ...newResults];

      dispatch(setCupomList(updatedCupomList));
      dispatch(setNextPage(data.next));
    }
  } catch (error) {
    console.error('Error fetching cupom list:', error);
    dispatch(fetchCupomListFailure(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchCupomListByProtector = (sponsorId, page = 1) => async (dispatch, getState) => {
  try {
    const currentState = getState();
    const nextPage = currentState.cupom.nextPage;

    // Verifica se a próxima página é diferente da atual
    if (nextPage !== page) {
      dispatch(setLoading(true));

      const response = await axios.get(`/cupons/user/?page=${page}`);
      const data = response.data;
      const currentCupomList = currentState.cupom.cupomListBySponsor?.[sponsorId] ?? [];

      // Filtra os novos resultados para remover duplicatas
      const newResults = data.results.filter(result => !currentCupomList.some(cupom => cupom.id === result.id));

      // Concatena os novos resultados com os existentes
      const updatedCupomList = [...currentCupomList, ...newResults];

      dispatch(setCupomListBySponsor({ sponsorId, cupomList: updatedCupomList }));
      dispatch(setNextPage(data.next));
    }
  } catch (error) {
    console.error('Error fetching cupom list:', error);
    dispatch(fetchCupomListFailure(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};


export const createCupom = (cupomData) => async (dispatch) => {
  try {
    const response = await axios.post('/cupons/', cupomData);
    dispatch(createCupomSuccess(response.data));
  } catch (error) {
    console.error('Error creating cupom:', error);
    dispatch(createCupomFailure(error.message));
    throw error;
  }
};

export const updateCupom = (cupomId, cupomData) => async (dispatch) => {
  try {
    const response = await axios.put(`/cupons/update/${cupomId}/`, cupomData);
    dispatch(updateCupomSuccess(response.data));
  } catch (error) {
    console.error('Error updating cupom:', error);
    dispatch(updateCupomFailure(error.message));
    throw error;
  }
};

export const deleteCupom = (cupomId) => async (dispatch) => {
  try {
    await axios.delete(`/cupons/delete/${cupomId}/`);
    dispatch(deleteCupomSuccess(cupomId));
  } catch (error) {
    console.error('Error deleting cupom:', error);
    dispatch(deleteCupomFailure(error.message));
    throw error;
  }
};

export const updateExpiredCupons = () => async (dispatch) => {
  try {
    const response = await axios.get('/cupons/update_expired/');
    dispatch(updateExpiredCuponsSuccess(response.data));
    dispatch(setNextPage(response.data.next));
  } catch (error) {
    console.error('Error updating expired cupons:', error);
    dispatch(updateExpiredCuponsFailure(error.message));
    throw error;
  }
};