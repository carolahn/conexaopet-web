import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { userReducer } from './userReducer';
import cupomSlice from './cupomSlice';
import petSlice from './petSlice';
import eventSlice from './eventSlice';
import addressSlice from './addressSlice';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  address: addressSlice,
  cupom: cupomSlice,
  pet: petSlice, 
  event: eventSlice,
});

export default rootReducer;
