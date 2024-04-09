import { createSlice } from '@reduxjs/toolkit';

const cupomSlice = createSlice({
  name: 'cupom',
  initialState: {
    cupomList: [],
    cupomListBySponsor: {},
    isLoading: false,
    nextPage: null,
    expiredInactiveCount: 0,
    expiredActiveCount: 0,
    error: null,
  },
  reducers: {
    setCupomList(state, action) {
      if (action.payload !== undefined) {
        state.cupomList = action.payload;
      }
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setNextPage(state, action) {
      state.nextPage = action.payload;
    },
    setCupomListBySponsor(state, action) {
      const { sponsorId, cupomList } = action.payload;
      state.eventListByProtector[sponsorId] = cupomList;
    },
    fetchCupomListFailure(state, action) {
      state.error = action.payload;
    },
    createCupomSuccess(state, action) {
      state.error = null;
      // Adicione o novo cupom à lista de cupons existente
      state.cupomList.unshift(action.payload);
    },
    createCupomFailure(state, action) {
      state.error = action.payload;
    },
    updateCupomSuccess(state, action) {
      state.error = null;
      // Atualize os dados do cupom na lista de cupons existente
      const updatedIndex = state.cupomList.findIndex(cupom => cupom.id === action.payload.id);
      if (updatedIndex !== -1) {
        state.cupomList[updatedIndex] = action.payload;
      }
    },
    updateCupomFailure(state, action) {
      state.error = action.payload;
    },
    deleteCupomSuccess(state, action) {
      state.error = null;
      // Remova o cupom da lista de cupons existente
      state.cupomList = state.cupomList.filter(cupom => cupom.id !== action.payload);
    },
    deleteCupomFailure(state, action) {
      state.error = action.payload;
    },
    updateExpiredCuponsSuccess(state, action) {
      state.error = null;
      state.expiredInactiveCount = action.payload.expired_inactive_count;
      state.expiredActiveCount = action.payload.expired_active_count;
      state.cupomList = action.payload.results.cupons;
    },
    updateExpiredCuponsFailure(state, action) {
      state.error = action.payload;
    },
    resetCupomState(state) { 
      return {
        cupomList: [],
        isLoading: false,
        nextPage: null,
        expiredInactiveCount: 0,
        expiredActiveCount: 0,
        error: null,
      };
    },
  },
});

export const { setCupomList, setLoading, setNextPage, fetchCupomListFailure, createCupomSuccess, createCupomFailure, updateCupomSuccess, updateCupomFailure, deleteCupomSuccess, deleteCupomFailure, updateExpiredCuponsSuccess, updateExpiredCuponsFailure, resetCupomState, setCupomListBySponsor } = cupomSlice.actions;

export default cupomSlice.reducer;
