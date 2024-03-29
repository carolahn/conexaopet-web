import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { userReducer } from './userReducer';
import cupomSlice from './cupomSlice';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  cupom: cupomSlice,
});

export default rootReducer;
