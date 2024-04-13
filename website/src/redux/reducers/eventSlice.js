import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    eventList: [],
    eventListByProtector: {},
    currentEventId: null,
    singleEvent: null,
    isLoading: false,
    nextPage: null,
    error: null,
  },
  reducers: {
    setEventList(state, action) {
      if (action.payload !== undefined) {
        state.eventList = action.payload;
      }
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setNextPage(state, action) {
      state.nextPage = action.payload;
    },
    setEventListByProtector(state, action) {
      const { protectorId, eventList } = action.payload;
      state.eventListByProtector[protectorId] = eventList;
    },
    createEventFailure(state, action) {
      state.error = action.payload;
    },
    updateEventSuccess(state, action) {
      state.error = null;
      // Atualize os dados do event na lista de cupons existente
      let updatedIndex = state.eventList.findIndex(event => event.id === action.payload.id);
      if (updatedIndex !== -1) {
        state.eventList[updatedIndex] = action.payload;
      }

      // Substitui o event atualizado na lista de events para o ownerId específico
      const ownerId = action.payload.owner.id;
      const eventList = state.eventListByProtector;
      if (eventList.hasOwnProperty(ownerId)) { 
        const updatedEventListByProtector = { ...eventList }; 
        updatedEventListByProtector[ownerId] = updatedEventListByProtector[ownerId].map(event => {
          if (event.id === action.payload.id) {
            return action.payload; 
          }
          return event; 
        });

        state.eventListByProtector = updatedEventListByProtector; 
        
      } else {
        console.log('Não há eventos do protetor:', ownerId);
        state.error = `Não há eventos do protetor: ${ownerId}`;
      }
    },
    updateEventFailure(state, action) {
      state.error = action.payload;
    },
    deleteEventFailure(state, action) {
      state.error = action.payload;
    },
    setCurrentEventId(state, action) {
      state.currentEventId = action.payload;
    },
    setSingleEvent(state, action) {
      state.singleEvent = action.payload;
    },
    resetEventState(state) { 
      return {
        eventList: [],
        eventListByProtector: {},
        currentEventId: null,
        singleEvent: null,
        isLoading: false,
        nextPage: null,
        error: null,
      };
    },
  },
});

export const { setEventList, setLoading, setNextPage, setEventListByProtector, createEventFailure, updateEventSuccess, updateEventFailure, deleteEventFailure, resetEventState, setCurrentEventId, setSingleEvent } = eventSlice.actions;

export default eventSlice.reducer;