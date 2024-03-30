import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { userReducer } from './userReducer';
import cupomSlice from './cupomSlice';
import petSlice from './petSlice';
import eventSlice from './eventSlice';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  cupom: cupomSlice,
  pet: petSlice, 
  event: eventSlice,
});

export default rootReducer;
