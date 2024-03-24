import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const enhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

export default store;