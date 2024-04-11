import { createSlice } from '@reduxjs/toolkit';

const petSlice = createSlice({
  name: 'pet',
  initialState: {
    petList: [],
    petListByProtector: {},
    petChoices: [],
    currentPetId: null,
    singlePet: null,
    isLoading: false,
    nextPage: null,
    error: null,
  },
  reducers: {
    setPetList(state, action) {
      if (action.payload !== undefined) {
        state.petList = action.payload;
      }
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setNextPage(state, action) {
      state.nextPage = action.payload;
    },
    setPetListByProtector(state, action) {
      const { protectorId, petList } = action.payload;
      state.petListByProtector[protectorId] = petList;
    },
    createPetFailure(state, action) {
      state.error = action.payload;
    },
    updatePetSuccess(state, action) {
      state.error = null;
      // Atualize os dados do cupom na lista de cupons existente
      let updatedIndex = state.petList.findIndex(pet => pet.id === action.payload.id);
      if (updatedIndex !== -1) {
        state.petList[updatedIndex] = action.payload;
      }

      const ownerId = action.payload.owner.id;
      const petList = state.petListByProtector;

      if (petList.hasOwnProperty(ownerId)) { 
        const updatedPetListByProtector = { ...petList }; 
        updatedPetListByProtector[ownerId] = updatedPetListByProtector[ownerId].map(pet => {
          if (pet.id === action.payload.id) {
            return action.payload; // Substitui o pet atualizado na lista de pets para o ownerId específico
          }
          return pet; 
        });

        state.petListByProtector = updatedPetListByProtector; 
        
      } else {
        console.log('Não há pets do protetor:', ownerId);
        state.error = `Não há pets do protetor: ${ownerId}`;
      }
    },
    updatePetFailure(state, action) {
      state.error = action.payload;
    },
    deletePetFailure(state, action) {
      state.error = action.payload;
    },
    getPetChoicesSuccess(state, action) {
      state.error = null;
      state.petChoices = action.payload;
    },
    getPetChoicesFailure(state, action) {
      state.error = action.payload;
    },
    setCurrentPetId(state, action) {
      state.currentPetId = action.payload;
    },
    setSinglePet(state, action) {
      state.singlePet = action.payload;
    },
    resetPetState(state) { 
      return {
        petList: [],
        petListByProtector: {},
        petChoices: [],
        currentPetId: null,
        singlePet: null,
        isLoading: false,
        nextPage: null,
        error: null,
      };
    },
  },
});

export const { setPetList, setLoading, setNextPage, setPetListByProtector, createPetFailure, updatePetSuccess, updatePetFailure, deletePetFailure, getPetChoicesSuccess, getPetChoicesFailure, resetPetState, setCurrentPetId, setSinglePet } = petSlice.actions;

export default petSlice.reducer;