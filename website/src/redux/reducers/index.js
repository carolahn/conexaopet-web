import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { userReducer } from './userReducer';
import cupomSlice from './cupomSlice';
import petSlice from './petSlice';
import eventSlice from './eventSlice';
import addressSlice, { resetAddressState } from './addressSlice';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  address: addressSlice,
  cupom: cupomSlice,
  pet: petSlice, 
  event: eventSlice,
});

export default rootReducer;
// export const rootReducerWithLogout = (state, action) => {
//   if (action.type === 'LOGOUT') {
//     state = resetAddressState(undefined, action); // Despacha a ação resetAddressState
//   }
//   return rootReducer(state, action);
// };